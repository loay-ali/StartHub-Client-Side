import { useTranslations } from "next-intl";

export default function AiDiscoveryStep({ error, setError, answers = [], setAnswers }: any) {
  const t = useTranslations();

  const handleChange = (index: number, val: string) => {
    const newAns = [...answers];
    newAns[index] = val;
    setAnswers?.(newAns);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">AI Business Discovery</h2>

        <p className="mt-3 text-text-secondary">
          Answer a few questions and let our AI generate your Business Model
          Canvas.
        </p>
      </div>

      {error && <p className='text-red-500'>{t('public.errors.' + error)}</p>}

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            What problem are you solving?
          </label>

          <textarea
            rows={4}
            value={answers[0] || ""}
            onChange={(e) => handleChange(0, e.target.value)}
            placeholder="Describe the problem your startup solves..."
            className="w-full rounded-2xl border border-border px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Who are your target customers?
          </label>

          <textarea
            rows={4}
            value={answers[1] || ""}
            onChange={(e) => handleChange(1, e.target.value)}
            placeholder="Describe your ideal customers..."
            className="w-full rounded-2xl border border-border px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            How will your business generate revenue?
          </label>

          <textarea
            rows={4}
            value={answers[2] || ""}
            onChange={(e) => handleChange(2, e.target.value)}
            placeholder="Subscriptions, commissions, licensing..."
            className="w-full rounded-2xl border border-border px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            What makes your startup unique?
          </label>

          <textarea
            rows={4}
            value={answers[3] || ""}
            onChange={(e) => handleChange(3, e.target.value)}
            placeholder="Explain your competitive advantage..."
            className="w-full rounded-2xl border border-border px-4 py-3 outline-none"
          />
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-primary/5 p-6">
        <p className="font-medium text-primary">
          🤖 Our AI will analyze your answers and generate a Business Model
          Canvas score.
        </p>
      </div>
    </div>
  );
}
