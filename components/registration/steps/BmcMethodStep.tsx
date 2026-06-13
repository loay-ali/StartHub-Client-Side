interface Props {
  onSelect: (method: "upload" | "ai") => void;
}

export default function BmcMethodStep({ onSelect }: Props) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">Choose BMC Method</h2>

        <p className="mt-3 text-text-secondary">
          Select how you would like to continue.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          onClick={() => onSelect("upload")}
          className="rounded-3xl border border-border p-8 text-left transition hover:border-primary hover:shadow-md"
        >
          <h3 className="text-xl font-semibold">Upload Existing BMC</h3>

          <p className="mt-3 text-text-secondary">
            Upload your current Business Model Canvas and receive an AI-powered
            score.
          </p>
        </button>

        <button
          onClick={() => onSelect("ai")}
          className="rounded-3xl border border-border p-8 text-left transition hover:border-primary hover:shadow-md"
        >
          <h3 className="text-xl font-semibold">Generate With AI</h3>

          <p className="mt-3 text-text-secondary">
            Let our AI guide you through a few questions and generate your BMC.
          </p>
        </button>
      </div>
    </div>
  );
}
