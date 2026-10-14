import type { DetailedHTMLProps, HTMLAttributes } from "react";

// Web component chargé globalement par public/js/lottie-player.js
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
      };
    }
  }
}
