import { PersonAdd, PersonAddRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useNotify } from "@/components/AlertProvider";
import { Card, PageHeader } from "@/components/ui";
import { api, getErrorMessage } from "@/lib/api";
import { useAuth } from "../AuthProvider";
import PasswordField from "../components/PasswordField";
import { COMMUNES_BY_REGION } from "../data/locations";
import { SECURITY_QUESTION_KEYS } from "../data/securityQuestions";
import {
  COUNTRIES,
  LANGUAGES,
  REGIONS,
  ROLES,
  YES_NO,
} from "../data/signupOptions";

/** Bloc de champs : une colonne sur mobile, deux à partir de sm. */
function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

interface ChoiceProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

function Choice({ label, options, value, onChange, disabled }: ChoiceProps) {
  return (
    <Autocomplete
      options={options}
      value={value}
      disabled={disabled}
      onChange={(_, v) => onChange(v)}
      renderInput={(params) => <TextField {...params} label={label} required />}
    />
  );
}

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { authenticate } = useAuth();
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<string | null>("Malgache");
  const [country, setCountry] = useState<string | null>("Madagascar");
  const [region, setRegion] = useState<string | null>("ANALAMANGA");
  const [commune, setCommune] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(ROLES[0]);
  const [inSmallGroup, setInSmallGroup] = useState<string | null>("Oui");
  const [accepted, setAccepted] = useState(false);

  const inMadagascar = country === "Madagascar";
  const communes = region ? (COMMUNES_BY_REGION[region] ?? []) : [];

  const warn = (key: string) => notify({ type: "warning", message: t(key) });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = (name: string) => String(form.get(name) ?? "").trim();
    const optional = (name: string) => text(name) || null;
    const password = String(form.get("password") ?? "");

    if (
      !text("nom") ||
      !text("prenom") ||
      !text("pseudo") ||
      !password ||
      !lang ||
      !country ||
      !role ||
      !inSmallGroup
    ) {
      return warn("alert.3");
    }
    if (inMadagascar && (!region || !commune)) return warn("alert.3");
    if (password.length < 8) return warn("alert.4");
    if (password !== form.get("repassword")) return warn("alert.5");
    if (inSmallGroup === "Oui" && !text("id_pg")) return warn("alert.3");
    if (!accepted) return warn("alert.6");

    setLoading(true);
    try {
      const { data } = await api.post<{ token: string }>("/ajoutmembre", {
        nom: text("nom"),
        prenom: text("prenom"),
        pseudo: text("pseudo"),
        password,
        email: optional("email"),
        phone: optional("phone"),
        ln: lang,
        adresse: {
          pays: country,
          region: inMadagascar ? region : null,
          commune: inMadagascar ? commune : null,
        },
        role,
        is_pg: inSmallGroup,
        id_pg: inSmallGroup === "Oui" ? text("id_pg") : null,
        qst: Number(form.get("qst")),
        reponse: text("reponse"),
      });
      // L'utilisateur est connecté : la redirection vers /cours est automatique.
      await authenticate(data.token);
    } catch (error) {
      notify({ type: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageHeader
        title={t("login.titre.1")}
        description={t("home.description")}
      />
      <Card className="p-6 sm:p-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-8"
        >
          <FieldGroup>
            <TextField
              name="nom"
              label={t("login.label.0")}
              autoComplete="family-name"
              required
            />
            <TextField
              name="prenom"
              label={t("login.label.1")}
              autoComplete="given-name"
              required
            />
            <TextField
              name="pseudo"
              label={t("login.label.2")}
              autoComplete="username"
              required
            />
            <TextField
              name="email"
              type="email"
              label={t("login.label.5")}
              autoComplete="email"
            />
            <PasswordField
              name="password"
              label={t("login.label.3")}
              autoComplete="new-password"
              helperText={t("alert.4")}
              required
            />
            <PasswordField
              name="repassword"
              label={t("login.label.4")}
              autoComplete="new-password"
              required
            />
            <TextField
              name="phone"
              type="tel"
              label={t("login.label.6")}
              placeholder="+261 XX XX XXX XX"
              autoComplete="tel"
            />
            <Choice
              label={t("login.label.7")}
              options={LANGUAGES}
              value={lang}
              onChange={setLang}
            />
          </FieldGroup>

          <hr className="border-brand-100" />

          <FieldGroup>
            <Choice
              label={t("login.label.8")}
              options={COUNTRIES}
              value={country}
              onChange={setCountry}
            />
            {inMadagascar && (
              <>
                <Choice
                  label={t("login.label.9")}
                  options={REGIONS}
                  value={region}
                  onChange={(r) => {
                    setRegion(r);
                    setCommune(null);
                  }}
                />
                <Choice
                  label={t("login.label.10")}
                  options={communes}
                  value={commune}
                  onChange={setCommune}
                  disabled={!region}
                />
              </>
            )}
            <Choice
              label={t("login.label.11")}
              options={ROLES}
              value={role}
              onChange={setRole}
            />
            <Choice
              label={t("login.label.12")}
              options={YES_NO}
              value={inSmallGroup}
              onChange={setInSmallGroup}
            />
            {inSmallGroup === "Oui" && (
              <TextField name="id_pg" label={t("login.label.13")} required />
            )}
          </FieldGroup>

          <hr className="border-brand-100" />

          <FieldGroup>
            <TextField
              name="qst"
              select
              label={t("login.label.17")}
              defaultValue={0}
            >
              {SECURITY_QUESTION_KEYS.map((key, index) => (
                <MenuItem key={key} value={index}>
                  {t(key)}
                </MenuItem>
              ))}
            </TextField>
            <TextField name="reponse" label={t("login.label.20")} required />
          </FieldGroup>

          <FormControlLabel
            control={
              <Checkbox
                checked={accepted}
                onChange={(_, checked) => setAccepted(checked)}
              />
            }
            label={t("login.label.14")}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="text"
              size="large"
              startIcon={<PersonAddRounded />}
              onClick={() => navigate("/")}
            >
              {t("button.6")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<PersonAdd />}
              loading={loading}
            >
              {t("button.7")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
