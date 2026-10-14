import { CheckRounded, SearchRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useNotify } from "@/components/AlertProvider";
import { Card } from "@/components/ui";
import { api, getErrorMessage } from "@/lib/api";
import { SECURITY_QUESTION_KEYS } from "../data/securityQuestions";

interface FoundUser {
  id: number;
  email: string | null;
  /** Index de la question de sécurité choisie à l'inscription. */
  question: number | null;
}

type Method = "email" | "qst";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [found, setFound] = useState<FoundUser | null>(null);
  const [method, setMethod] = useState<Method>("email");

  const findUser = async () => {
    if (!username) {
      notify({ type: "warning", message: t("alert.3") });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get<{ user: FoundUser }>(
        "/resetpassword/finduser",
        { params: { username } },
      );
      setFound(data.user);
      // Sans email enregistré, seule la question de sécurité est possible.
      setMethod(data.user.email ? "email" : "qst");
    } catch (error) {
      notify({
        type: "error",
        message: getErrorMessage(error, "Erreur de connexion"),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!found) return;
    setLoading(true);
    try {
      if (method === "qst") {
        const { data } = await api.post<{ message: string; url: string }>(
          "/resetpassword/checkqst",
          { id: found.id, reponse: answer },
        );
        notify({ type: "success", message: data.message });
        navigate(data.url);
      } else {
        const { data } = await api.post<{ message: string }>(
          "/resetpassword/sendTokenmail",
          { email: found.email },
        );
        notify({ type: "success", message: data.message });
      }
    } catch (error) {
      notify({ type: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  const questionKey =
    found?.question != null ? SECURITY_QUESTION_KEYS[found.question] : null;

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="p-6 sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-brand-900">
          {t("login.titre.2")}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <TextField
            label={t("login.label.2")}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFound(null);
            }}
            autoComplete="username"
            required
            autoFocus
          />
          {found && (
            <FormControl className="rounded-2xl bg-brand-50 p-4">
              <FormLabel
                id="recovery-method"
                className="mb-1! font-semibold! text-brand-900!"
              >
                {t("login.label.15")}
              </FormLabel>
              <RadioGroup
                aria-labelledby="recovery-method"
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
              >
                {found.email && (
                  <FormControlLabel
                    value="email"
                    control={<Radio />}
                    label={t("login.label.16")}
                  />
                )}
                <FormControlLabel
                  value="qst"
                  control={<Radio />}
                  label={t("login.label.17")}
                />
              </RadioGroup>
            </FormControl>
          )}
          {method === "qst" && questionKey && (
            <TextField
              label={t(questionKey)}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          )}
          {found ? (
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
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchRounded />}
              loading={loading}
              onClick={findUser}
              fullWidth
            >
              {t("button.9")}
            </Button>
          )}
          <Link
            to="/"
            className="text-center text-sm font-medium text-brand-600 hover:text-brand-800 hover:underline"
          >
            {t("button.6")}
          </Link>
        </form>
      </Card>
    </div>
  );
}
