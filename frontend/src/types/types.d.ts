declare module "@splidejs/react-splide" {
  import { ComponentType, ReactNode } from "react";

  interface SplideOptions {
    type?: "slide" | "loop" | "fade";
    autoplay?: boolean;
    interval?: number;
    arrows?: boolean;
    pagination?: boolean;
    [key: string]: any;
  }

  interface SplideProps {
    options?: Partial<SplideOptions>;
    // children: ReactNode;
    [key: string]: any;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<{ children: ReactNode }>;
}
