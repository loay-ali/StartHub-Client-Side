import EventFilters from "../../../../../../components/dashboard/investor/events/EventFilters";
import EventList from "../../../../../../components/dashboard/investor/events/EventList";

export default function EventsPage() {
  return (
    <div className="space-y-8 p-6">
      <EventFilters />

      <EventList />
    </div>
  );
}
