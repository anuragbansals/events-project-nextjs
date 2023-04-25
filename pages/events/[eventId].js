import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/eventDetail/eventSummary";
import EventsLogistics from "../../components/eventDetail/eventLogistics";
import EventContent from "../../components/eventDetail/eventContent";
import ErrorAlert from "../../components/ui/errorAlert";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center" >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Fragment>
        <EventSummary title={event.title} />
        <EventsLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    </div>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;
