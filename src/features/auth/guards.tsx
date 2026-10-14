import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router";
import { useNotify } from "@/components/AlertProvider";
import { useAuth } from "./AuthProvider";

/** Pages réservées aux membres connectés (la formation). */
export function RequireAuth() {
  const { user } = useAuth();
  const notify = useNotify();
  const { t } = useTranslation();

  // Avertit uniquement le visiteur arrivé ici sans être connecté, pas celui qui
  // vient de se déconnecter depuis une page de formation.
  const [deniedOnArrival] = useState(() => !user);
  useEffect(() => {
    if (deniedOnArrival) notify({ type: "warning", message: t("alert.7") });
  }, [deniedOnArrival, notify, t]);

  return user ? <Outlet /> : <Navigate to="/" replace />;
}

/** Pages réservées aux visiteurs (connexion, inscription, mot de passe oublié). */
export function GuestOnly() {
  const { user } = useAuth();
  return user ? <Navigate to="/cours" replace /> : <Outlet />;
}
