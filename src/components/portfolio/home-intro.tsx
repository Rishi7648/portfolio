"use client";

import * as React from "react";
import { Hero } from "@/components/portfolio/hero";
import { LoadingScreen } from "@/components/portfolio/loading-screen";

/** Keep the intro animation isolated so the full homepage can be server rendered. */
export function HomeIntro() {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoadingComplete = React.useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <Hero startAnimation={loaded} />
    </>
  );
}
