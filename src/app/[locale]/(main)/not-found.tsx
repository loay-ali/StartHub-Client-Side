"use client";

import Lottie from "lottie-react";

import Link from "next/link";
import { ArrowLeft, House, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Lottie */}

      {/* 404 */}
      <h1 className="text-7xl font-black text-teal-700">404</h1>

      {/* Title */}
      <h2 className="mt-4 text-4xl font-bold">Oops! Page Not Found</h2>

      {/* Description */}
      <p className="mt-3 max-w-lg text-gray-500">
        The page you are looking for might have been removed, renamed, or is
        temporarily unavailable.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-white"
        >
          <House size={18} />
          Home
        </Link>

        <Link
          href="/contact-us"
          className="flex items-center gap-2 rounded-xl border px-5 py-3"
        >
          <Mail size={18} />
          Contact Us
        </Link>

        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 rounded-xl border px-5 py-3"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}
