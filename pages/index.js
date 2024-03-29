import EventList from "../components/events/eventList";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
