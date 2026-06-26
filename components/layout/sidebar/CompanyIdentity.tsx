interface CompanyIdentityProps {
  companyName: string;
  companyPlan: string;
}

export default function CompanyIdentity({
  companyName,
  companyPlan,
}: CompanyIdentityProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">
            {companyName.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-text-primary">
              {companyName}
            </h3>

            <p className="text-sm text-text-secondary">
              {companyPlan}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}