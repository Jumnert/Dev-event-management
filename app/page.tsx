import EventList from "@/components/EventList";
import ExploreBtn from "@/components/ExploreBtn";
import { getAllEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/database";

export default async function Page() {
  const events = await getAllEvents() as IEvent[];

  return (
    <section className="relative z-10">
      <div className="flex flex-col items-center text-center space-y-8 pt-20">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <h1 className="text-7xl md:text-8xl font-black !leading-tight tracking-tighter uppercase text-gradient">
            The Pulse of <br />
            <span className="text-primary italic">Dev Events</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">
            Where Innovation Meets Opportunity. <br className="hidden md:block" />
            Hackathons, Meetups, and Conferences. All in one place.
          </p>
        </div>

        <div className="pt-4 animate-in fade-in zoom-in-95 delay-300 duration-1000 fill-mode-both">
          <ExploreBtn />
        </div>
      </div>

      <div id="events" className="mt-40 space-y-12">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-4xl font-bold uppercase tracking-tighter text-gradient">Featured Events</h3>
          <div className="h-0.5 flex-1 mx-8 bg-gradient-to-r from-primary/30 to-transparent" />
        </div>

        <EventList initialEvents={events} />
      </div>
    </section>
  );
}


