type PaymentTabsProps = {
  activeMethod: string;
  onChange: (method: string) => void;
  methods: {
    id: string;
    name: string;
  }[];
};

export default function PaymentTabs({
  activeMethod,
  onChange,
  methods,
}: PaymentTabsProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-3 rounded-2xl border border-border bg-background p-3 shadow-md">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
              activeMethod === method.id
                ? "bg-primary text-white shadow-lg"
                : "bg-surface text-text-primary hover:bg-primary/10"
            }`}
          >
            {method.name}
          </button>
        ))}
      </div>
    </div>
  );
}
