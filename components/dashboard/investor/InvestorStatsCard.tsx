interface Props {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function InvestorStatsCard({
  title,
  value,
  subtitle,
  icon,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-teal-50
            text-teal-700
          "
        >
          {icon}
        </div>

        <div>
          <p className="text-xl font-medium text-gray-500">{title}</p>
        </div>
      </div>

      {/* Value */}
      <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
        {value}
      </h2>

      {/* Subtitle */}
      <p className="mt-4 text-lg font-medium text-green-600">{subtitle}</p>
    </div>
  );
}
