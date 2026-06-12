import { FiClock, FiGlobe, FiMonitor } from "react-icons/fi";

export default function PreferencesSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Preferences</h2>

      <p className="mt-2 text-text-secondary">
        Customize your platform experience.
      </p>

      <div className="mt-8 space-y-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <FiGlobe />

            <span className="font-medium">Language</span>
          </div>

          <select className="w-full rounded-xl border border-border px-4 py-3">
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <FiClock />

            <span className="font-medium">Timezone</span>
          </div>

          <select className="w-full rounded-xl border border-border px-4 py-3">
            <option>Africa/Cairo</option>
            <option>UTC</option>
            <option>Europe/London</option>
          </select>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <FiMonitor />

            <span className="font-medium">Theme</span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <button className="rounded-xl border border-primary bg-primary/10 px-4 py-3 font-medium text-primary">
              Light
            </button>

            <button className="rounded-xl border border-border px-4 py-3 hover:bg-slate-50">
              Dark
            </button>

            <button className="rounded-xl border border-border px-4 py-3 hover:bg-slate-50">
              System
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="rounded-xl bg-primary px-6 py-3 text-white">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
