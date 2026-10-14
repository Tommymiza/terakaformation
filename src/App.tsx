import { Navigate, Outlet, Route, Routes } from "react-router";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import NotFound from "@/components/NotFound";
import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/features/auth/AuthProvider";
import { GuestOnly, RequireAuth } from "@/features/auth/guards";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import CatalogPage from "@/features/formation/pages/CatalogPage";
import ChapterPage from "@/features/formation/pages/ChapterPage";
import LessonPage from "@/features/formation/pages/LessonPage";

function Layout() {
  const { initializing } = useAuth();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-10">
        <Breadcrumbs />
        {initializing ? <PageLoader /> : <Outlet />}
      </main>
      <footer className="bg-brand-900 text-brand-100">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm sm:px-6">
          <span>© TERAKA</span>
          <a
            href="https://teraka.org/mention.html"
            className="underline-offset-4 hover:text-white hover:underline"
          >
            Mentions légales
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<GuestOnly />}>
          <Route index element={<LoginPage />} />
          <Route path="inscription" element={<SignupPage />} />
          <Route path="mot-de-passe-oublie" element={<ForgotPasswordPage />} />
        </Route>
        <Route path="renew/:token" element={<ResetPasswordPage />} />
        <Route path="cours" element={<RequireAuth />}>
          <Route index element={<CatalogPage />} />
          <Route path=":chapter" element={<ChapterPage />} />
          <Route path=":chapter/:lesson" element={<LessonPage />} />
        </Route>
        {/* Anciennes URL (avec espaces), conservées pour les liens existants. */}
        <Route
          path="sign up"
          element={<Navigate to="/inscription" replace />}
        />
        <Route
          path="reset password"
          element={<Navigate to="/mot-de-passe-oublie" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
