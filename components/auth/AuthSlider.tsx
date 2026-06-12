"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

import analyticsAnimation from "../../src/assets/lottie/analytics.json";
import dashboardAnimation from "../../src/assets/lottie/dashboard.json";
import loginAnimation from "../../src/assets/lottie/loginlotti.json";

const slides = [
  {
    animation: dashboardAnimation,
    title: "Manage Your Companies",
    description:
      "Track and manage all your companies from one centralized dashboard.",
  },
  {
    animation: analyticsAnimation,
    title: "Monitor Token Usage",
    description:
      "Keep full visibility on AI token consumption and platform activity.",
  },
  {
    animation: loginAnimation,
    title: "Scale With Confidence",
    description:
      "Powerful analytics and tools to help your business grow faster.",
  },
];

export default function AuthSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden overflow-hidden bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10" />

      <div className="relative z-10 max-w-lg px-8 text-center text-white">
        <div
          key={currentSlide}
          className="mx-auto mb-8 w-72 transition-all duration-500 xl:w-96"
        >
          <Lottie animationData={slides[currentSlide].animation} loop />
        </div>

        <h2 className="mb-4 text-4xl font-bold leading-tight xl:text-5xl">
          {slides[currentSlide].title}
        </h2>

        <p className="text-lg leading-8 text-white/80">
          {slides[currentSlide].description}
        </p>

        <div className="mt-10 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
