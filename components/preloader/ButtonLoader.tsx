"use client";
// src/components/ui/ButtonLoader.tsx

import React from "react";

/* ─── StarHub Orbital Loader (replaces 3-dot bounce) ─────────────────────── */

interface ButtonLoaderProps {
  size?: number;
  color?: string;
}

export const ButtonLoader = ({ size = 16, color = "currentColor" }: ButtonLoaderProps) => {
  // Detect if we should use the light (white-ish) variant for dark buttons
  const isLight =
    color === "white" ||
    color === "#fff" ||
    color === "#ffffff" ||
    color.includes("255,255,255") ||
    color.includes("rgba(255");

  const c = isLight
    ? {
        hub: "rgba(255,255,255,0.4)",
        inner: "#ffffff",
        orbit1: "rgba(255,255,255,0.25)",
        p1: "rgba(255,255,255,0.7)",
        orbit2: "rgba(255,255,255,0.15)",
        p2: "rgba(255,255,255,0.5)",
      }
    : {
        hub: "#0F766E",
        inner: "#5EEAD4",
        orbit1: "#CCFBF1",
        p1: "#0F766E",
        orbit2: "#CCFBF1",
        p2: "#14B8A6",
      };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Hub */}
      <circle cx="8" cy="8" r="2.5" fill={c.hub}>
        <animate attributeName="r" values="2.5;3;2.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="8" cy="8" r="1.5" fill={c.inner}>
        <animate attributeName="r" values="1.5;1.8;1.5" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Inner orbit */}
      <circle
        cx="8"
        cy="8"
        r="5"
        stroke={c.orbit1}
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="2 2"
        opacity="0.5"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 8 8"
          to="360 8 8"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="13" cy="8" r="1.5" fill={c.p1}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 8 8"
          to="360 8 8"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Outer orbit */}
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke={c.orbit2}
        strokeWidth="0.4"
        fill="none"
        strokeDasharray="3 4"
        opacity="0.3"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 8 8"
          to="0 8 8"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="15" cy="8" r="1.2" fill={c.p2}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 8 8"
          to="0 8 8"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

/* ─── LoadingButton — drop-in wrapper around any <button> ────────────────── */
/*
    Usage:
      <LoadingButton
        loading={isSaving}
        loadingText="Saving…"
        style={{ ...yourButtonStyles }}
        onClick={handleSave}
      >
        Save
      </LoadingButton>

    Props:
      loading      – controls loader visibility and disables the button
      loadingText  – label shown next to the loader (falls back to children)
      loaderSize   – loader size in px (default 16)
      loaderColor  – "currentColor" | "white" | "#fff" | "#0F766E" …
                     Pass "white" / "#fff" for dark buttons to get the light spinner
      All standard <button> props are forwarded.
*/

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  loaderSize?: number;
  loaderColor?: string;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      loading = false,
      loadingText,
      loaderSize = 16,
      loaderColor = "currentColor",
      disabled,
      children,
      style,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <>
          <ButtonLoader size={loaderSize} color={loaderColor} />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        children
      )}
    </button>
  ),
);

LoadingButton.displayName = "LoadingButton";
export default LoadingButton;