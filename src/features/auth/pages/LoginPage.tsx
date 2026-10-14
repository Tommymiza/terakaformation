import { LoginRounded, PersonAddRounded } from "@mui/icons-material";
import { Button, Divider, TextField } from "@mui/material";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useNotify } from "@/components/AlertProvider";
import { Card } from "@/components/ui";
import { getErrorMessage } from "@/lib/api";
import { useAuth } from "../AuthProvider";
import AuthHero from "../components/AuthHero";
import PasswordField from "../components/PasswordField";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const pseudo = String(form.get("pseudo") ?? "");
    const password = String(form.get("password") ?? "");
    if (!pseudo || !password) {
      notify({ type: "warning", message: t("alert.3") });
      return;
    }
    setLoading(true);
    try {
      const message = await login(pseudo, password);
      notify({ type: "success", message });
    } catch (error) {
      notify({ type: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
      <AuthHero />
      <Card className="flex flex-col justify-center p-6 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-900">
          {t("login.titre.0")}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <TextField
            name="pseudo"
            label={`${t("login.label.2")} / ${t("login.label.5")}`}
            autoComplete="username"
            autoFocus
          />
          <div className="flex flex-col gap-2">
            <PasswordField
              name="password"
              label={t("login.label.3")}
              autoComplete="current-password"
            />
            <Link
              to="/mot-de-passe-oublie"
              className="self-end text-sm font-medium text-brand-600 hover:text-brand-800 hover:underline"
            >
              {t("button.8")}
            </Link>
          </div>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<LoginRounded />}
            loading={loading}
            fullWidth
          >
            {t("button.6")}
          </Button>
        </form>
        <Divider className="my-8!" />
        <Button
          variant="outlined"
          size="large"
          startIcon={<PersonAddRounded />}
          onClick={() => navigate("/inscription")}
          fullWidth
        >
          {t("button.7")}
        </Button>
      </Card>
    </div>
  );
}
