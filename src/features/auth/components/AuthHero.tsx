import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";

const IMAGES = ["/images/home-1.jpeg", "/images/home-2.jpeg"];

/** Panneau visuel des pages de connexion : photos du terrain et message d'accueil. */
export default function AuthHero() {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col justify-end overflow-hidden rounded-3xl bg-brand-900 p-6 text-white sm:p-8 lg:min-h-[34rem]">
      <div className="absolute inset-0 opacity-90">
        <Slider
          autoPlay
          interval={4500}
          tone="dark"
          className="h-full [&>div:first-child]:h-full [&>div:first-child]:rounded-none [&>div:last-child]:hidden"
        >
          {IMAGES.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-full min-h-[22rem] w-full object-cover lg:min-h-[34rem]"
            />
          ))}
        </Slider>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/40 to-transparent" />
      <div className="relative mt-48 lg:mt-0">
        <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
          TERAKA
        </p>
        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
          {t("home.head")}
        </h2>
        <p className="mt-2 text-white/80">{t("home.description")}</p>
      </div>
    </div>
  );
}
