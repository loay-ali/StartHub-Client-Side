"use client";

import Lottie from "lottie-react";
import animationData from "@/public/lotties/ai-animation.json";

export default function AILottie() {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      className="h-full w-full"
    />
  );
}
