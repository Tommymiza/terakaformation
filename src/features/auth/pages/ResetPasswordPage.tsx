import { CheckRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Card } from "@/components/ui";
import PasswordField from "../components/PasswordField";
import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams } from "react-router";
import { useNotify } from "@/components/AlertProvider";
import { api, getErrorMessage } from "@/lib/api";

interface ResetToken {
  pseudo: string;
  exp: number;
}

function decodeValidToken(token: string | undefined): ResetToken | null {
  if (!token) return null;
  try {
    const decoded = jwtDecode<ResetToken>(token);
    return Date.now() < decoded.exp * 1000 ? decoded : null;
  } catch {
    return null;
  }
}

/** Page ouverte depuis le lien de réinitialisation : /renew/:token */
export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { token } = useParams();
  const decoded = useMemo(() => decodeValidToken(token), [token]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!decoded) notify({ type: "error", message: "Lien expiré" });
  }, [decoded, notify]);

  if (!decoded) return <Navigate to="/lien-invalide" replace />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password !== form.get("rpassword")) {
      notify({ type: "warning", message: t("alert.5") });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post<{ message: string }>(
        "/resetpassword/modifypassword",
        // Le backend vérifie la signature du jeton et en déduit le compte.
        { token, password },
      );
      notify({ type: "success", message: data.message });
      navigate("/");
    } catch (error) {
      notify({
        type: "error",
        message: getErrorMessage(error, "Erreur de connexion"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="p-6 sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-brand-900">
          {t("login.label.19")}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <PasswordField
            name="password"
            label={t("login.label.3")}
            autoComplete="new-password"
            helperText={t("alert.4")}
            required
            autoFocus
          />
          <PasswordField
            name="rpassword"
            label={t("login.label.4")}
            autoComplete="new-password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<CheckRounded />}
            loading={loading}
            fullWidth
          >
            {t("button.10")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
