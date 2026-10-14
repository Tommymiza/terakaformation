import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import {
  Children,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

interface SliderProps {
  children: ReactNode;
  /** Défilement automatique (mis en pause au survol et au focus). */
  autoPlay?: boolean;
  /** Délai entre deux diapositives, en ms. */
  interval?: number;
  className?: string;
  /** Variante sombre des contrôles, pour un slider posé sur une photo. */
  tone?: "light" | "dark";
}

const SWIPE_THRESHOLD_PX = 40;

export default function Slider({
  children,
  autoPlay = false,
  interval = 5000,
  className = "",
  tone = "light",
}: SliderProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const goTo = (i: number) => setIndex(((i % count) + count) % count);

  useEffect(() => {
    if (!autoPlay || paused || count < 2) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, count]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  };

  const onPointerDown = (e: PointerEvent) => {
    swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const delta = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX)
      goTo(index + (delta < 0 ? 1 : -1));
  };

  const arrow =
    tone === "dark"
      ? "bg-brand-950/50 text-white hover:bg-brand-950/70"
      : "bg-white/90 text-brand-900 shadow-card hover:bg-white";

  return (
    <div
      className={`slider group/slider relative w-full ${className}`}
      role="region"
      aria-roledescription="carrousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="touch-pan-y overflow-hidden rounded-2xl"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
      >
        <div
          className="flex items-stretch transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex w-full shrink-0 flex-col items-center justify-center"
              aria-hidden={i !== index}
              inert={i !== index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => goTo(index - 1)}
            className={`absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full transition focus-visible:outline-2 focus-visible:outline-brand-500 sm:opacity-0 sm:group-hover/slider:opacity-100 sm:group-focus-within/slider:opacity-100 ${arrow}`}
          >
            <ChevronLeftRounded />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => goTo(index + 1)}
            className={`absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full transition focus-visible:outline-2 focus-visible:outline-brand-500 sm:opacity-0 sm:group-hover/slider:opacity-100 sm:group-focus-within/slider:opacity-100 ${arrow}`}
          >
            <ChevronRightRounded />
          </button>
          <div className="mt-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Diapositive ${i + 1} sur ${count}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-brand-600"
                    : "w-2 bg-brand-200 hover:bg-brand-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
