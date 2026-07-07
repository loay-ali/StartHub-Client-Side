import OpportunityFilters from "../../../../../../components/dashboard/investor/opportunity/OpportunityFilters";
import OpportunityList from "../../../../../../components/dashboard/investor/opportunity/OpportunityList";

export default function OpportunitiesPage() {
  return (
    <div className="space-y-8 p-6">
      <OpportunityFilters />

      <OpportunityList />
    </div>
  );
}
