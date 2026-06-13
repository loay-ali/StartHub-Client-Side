import { FiCheckCircle, FiTrendingUp } from "react-icons/fi";

export default function BmcScoreStep() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <FiTrendingUp size={36} className="text-green-600" />
        </div>

        <h2 className="text-4xl font-bold">BMC Analysis Complete</h2>

        <p className="mt-3 text-text-secondary">
          Our AI has analyzed your Business Model Canvas.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-surface p-10 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wider text-text-secondary">
          BMC Score
        </p>

        <div className="mt-4 text-7xl font-bold text-primary">85</div>

        <p className="mt-2 text-xl font-semibold text-green-600">
          Excellent Business Potential
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-border p-8">
        <h3 className="mb-6 text-xl font-semibold">Key Strengths</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />

            <span>Strong value proposition</span>
          </div>

          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />

            <span>Clear customer segmentation</span>
          </div>

          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />

            <span>Scalable revenue model</span>
          </div>

          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />

            <span>High market opportunity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
