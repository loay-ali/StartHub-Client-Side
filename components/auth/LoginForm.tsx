export default function LoginForm() {
  return (
    <div className="flex items-center justify-center bg-surface px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-10 flex items-center gap-3"></div>

        <h1 className="text-4xl font-bold text-text-primary">Welcome Back</h1>

        <p className="mt-3 text-text-secondary">
          Sign in to continue to your dashboard
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 shadow-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-border" />
              Remember me
            </label>

            <button type="button" className="text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
