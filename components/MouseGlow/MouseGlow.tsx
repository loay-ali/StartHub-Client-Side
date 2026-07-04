"use client";
import { useEffect, useRef } from "react";
import styles from "./MouseGlow.module.css";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--mx", `${e.clientX}px`);
      ref.current.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return <div ref={ref} className={styles.glow} aria-hidden="true" />;
}