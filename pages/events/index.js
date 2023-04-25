import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/eventList";
import EventsSearch from "../../components/events/eventsSearch";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const {events} = props;
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(){
  const events = await getAllEvents()
  return {
    props: {
      events: events
    },
    revalidate: 60
  }
}

export default AllEventsPage;
