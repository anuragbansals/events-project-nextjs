import { useRouter } from "next/router";
import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/resultsTitle";
import { getFilteredEvents } from "../../helpers/api-util";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/errorAlert";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  // const {data, error} = useSWR('https://nextjs-4f0f8-default-rtdb.firebaseio.com/events.json')

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://nextjs-4f0f8-default-rtdb.firebaseio.com/events.json"
      );
      const data = await response.json();
      if (data) {
        const events = [];
        for (const key in data) {
          events.push({
            id: key,
            ...data[key],
          });
        }
        setLoadedEvents(events);
      }
    }
    getData();
  }, []);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please Adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const {params} = context;
//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {hasError: true}
//       // notFound: true,
//       //  redirect: {
//       //   destination: '/error'
//       //  }
//     }
//   }

//   const events = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: events,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage;
