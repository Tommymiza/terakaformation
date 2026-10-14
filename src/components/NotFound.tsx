import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <lottie-player
        src="/lotties/error-page-not-found.json"
        background="transparent"
        speed="1"
        style={{ width: "220px", height: "220px" }}
        loop
        autoplay
      ></lottie-player>
      <Link
        to="/"
        className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
      >
        ← TERAKA
      </Link>
    </div>
  );
}
