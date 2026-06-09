import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>

      <h2 className="mt-4 text-3xl font-semibold text-text-primary">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-text-secondary">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-white transition hover:opacity-90"
      >
        <FiArrowLeft />
        Back to Dashboard
      </Link>
    </div>
  );
}
