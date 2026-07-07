import CompanyFilters from "../../../../../../components/dashboard/investor/company/CompanyFilters";
import CompanyList from "../../../../../../components/dashboard/investor/company/CompanyList";

export default function InvestorSearchPage() {
  return (
    <div className="space-y-8 p-6">
      <CompanyFilters />

      <CompanyList />
    </div>
  );
}
