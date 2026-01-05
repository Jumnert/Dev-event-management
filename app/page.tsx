import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";

export default async function Page() {
  // Connect to MongoDB
  await connectToDatabase();

  // Fetch events directly
  let events: IEvent[] = [];
  try {
    events = await Event.find({}).lean();
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event you can`t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathon, Meetups, and Conferences, All in one Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={event._id.toString()} className="list-none">
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>
      </div>
    </section>
  );
}
