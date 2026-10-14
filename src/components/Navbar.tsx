import {
  AbcOutlined,
  AccountCircleOutlined,
  HelpOutlineOutlined,
  LaunchRounded,
  LogoutRounded,
  MenuRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/features/auth/AuthProvider";
import { getErrorMessage } from "@/lib/api";
import { useNotify } from "./AlertProvider";
import LanguageSelect from "./LanguageSelect";

const EXTERNAL_LINKS = [
  { href: "https://programme.teraka.org", labelKey: "button.0" },
  { href: "https://rejoindre.teraka.org", labelKey: "button.1" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { user, logout } = useAuth();
  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);
  const [linksMenu, setLinksMenu] = useState<HTMLElement | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const openMenu =
    (setter: (el: HTMLElement | null) => void) =>
    (e: MouseEvent<HTMLElement>) =>
      setter(e.currentTarget);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      notify({ type: "error", message: getErrorMessage(error) });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          to={user ? "/cours" : "/"}
          className="flex shrink-0 items-center gap-3 rounded-lg"
        >
          <img src="/logo.png" alt="TERAKA" className="h-10 w-auto" />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-brand-800 transition hover:bg-brand-50 hover:text-brand-950"
            >
              {t(link.labelKey)} TERAKA
              <LaunchRounded sx={{ fontSize: 14 }} className="opacity-50" />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSelect />
          <IconButton
            className="md:hidden!"
            aria-label="Liens TERAKA"
            onClick={openMenu(setLinksMenu)}
          >
            <MenuRounded />
          </IconButton>
          {user && (
            <IconButton
              onClick={openMenu(setUserMenu)}
              aria-label={t("button.2")}
            >
              <Avatar
                sx={{ width: 36, height: 36, fontSize: 14, fontWeight: 600 }}
                className="bg-brand-600!"
              >
                {user.nom.charAt(0) + user.prenom.charAt(0)}
              </Avatar>
            </IconButton>
          )}
        </div>
      </div>

      <Menu
        open={Boolean(linksMenu)}
        anchorEl={linksMenu}
        onClose={() => setLinksMenu(null)}
      >
        {EXTERNAL_LINKS.map((link) => (
          <MenuItem key={link.href} component="a" href={link.href}>
            {t(link.labelKey)} TERAKA
          </MenuItem>
        ))}
      </Menu>

      {user && (
        <>
          <Menu
            open={Boolean(userMenu)}
            anchorEl={userMenu}
            onClose={() => setUserMenu(null)}
            onClick={() => setUserMenu(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: { sx: { mt: 1, minWidth: 220, borderRadius: 3 } },
            }}
          >
            <div className="px-4 py-2">
              <p className="font-semibold text-brand-900">
                {user.prenom} {user.nom}
              </p>
              <p className="text-sm text-brand-950/60">{user.points} points</p>
            </div>
            <MenuItem onClick={() => setAccountOpen(true)}>
              <ListItemIcon>
                <AccountCircleOutlined fontSize="small" />
              </ListItemIcon>
              {t("button.2")}
            </MenuItem>
            <MenuItem onClick={() => navigate("/cours")}>
              <ListItemIcon>
                <AbcOutlined fontSize="small" />
              </ListItemIcon>
              {t("button.3")}
            </MenuItem>
            <MenuItem onClick={() => navigate("/cours")}>
              <ListItemIcon>
                <HelpOutlineOutlined fontSize="small" />
              </ListItemIcon>
              {t("button.4")}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutRounded fontSize="small" />
              </ListItemIcon>
              {t("button.5")}
            </MenuItem>
          </Menu>

          <Dialog
            open={accountOpen}
            onClose={() => setAccountOpen(false)}
            slotProps={{ paper: { sx: { borderRadius: 4, minWidth: 320 } } }}
          >
            <DialogTitle className="font-semibold!">
              {t("button.2")}
            </DialogTitle>
            <DialogContent>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                <dt className="text-brand-950/60">Nom</dt>
                <dd className="font-medium">{user.nom}</dd>
                <dt className="text-brand-950/60">Prénom</dt>
                <dd className="font-medium">{user.prenom}</dd>
                <dt className="text-brand-950/60">Email</dt>
                <dd className="font-medium">{user.email ?? "—"}</dd>
                <dt className="text-brand-950/60">Points</dt>
                <dd className="font-semibold text-brand-600">{user.points}</dd>
              </dl>
            </DialogContent>
          </Dialog>
        </>
      )}
    </header>
  );
}
