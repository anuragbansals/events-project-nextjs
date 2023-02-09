import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/eventList";
import EventsSearch from "../../components/events/eventsSearch";
import { useRouter } from "next/router";

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter()
  
  function findEventsHandler(year, month){
      const fullPath = `/events/${year}/${month}/abc`;

    router.push();
  }


  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export default AllEventsPage;
