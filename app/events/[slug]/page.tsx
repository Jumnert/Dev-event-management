import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);
const booking = 0;
const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  if (!agendaItems || agendaItems.length === 0) return null;

  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
const EventTag = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div className="pill" key={tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      _id,
      title,
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      organizer,
      tags,
    },
  } = await request.json();
  if (!title) return notFound();

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  return (
    <section id="event" className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      <div className="header space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-xl text-light-200 max-w-4xl leading-relaxed">
          {description}
        </p>
      </div>

      <div className="details grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left Side Content */}
        <div className="content lg:col-span-2 space-y-12">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-xl group">
            <Image
              src={image}
              alt="Event banner"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
          </div>

          <div className="space-y-8">
            <section className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-6">Overview</h2>
              <p className="text-lg leading-relaxed italic">{overview}</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-xl border border-border space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-widest text-primary/60">When & Where</h2>
                <div className="space-y-4">
                  <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                  <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                  <EventDetailItem icon="/icons/pin.svg" alt="location" label={location} />
                </div>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-widest text-primary/60">Participation</h2>
                <div className="space-y-4">
                  <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                  <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                </div>
              </div>
            </section>

            <div className="bg-card p-6 rounded-xl border border-border">
              <EventAgenda agendaItems={agenda} />
            </div>

            <section className="space-y-4 px-2">
              <h2 className="text-2xl font-bold">About the Organizer</h2>
              <p className="text-muted-foreground text-lg">{organizer}</p>
            </section>

            <div className="pt-4">
              <EventTag tags={tags} />
            </div>
          </div>
        </div>

        {/* Right Side Sidebar */}
        <aside className="booking">
          <div className="signup-card sticky top-24 bg-card border border-border p-6 rounded-xl shadow-lg transition-all hover:border-primary/40">
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4">Secure your spot</h2>
            {booking > 0 ? (
              <p className="text-sm text-primary mb-8 font-medium">
                Join {booking} developers who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mb-8 italic">Be the first to join the revolution.</p>
            )}
            <BookEvent eventId={_id} slug={slug} />
          </div>
        </aside>
      </div>

      <div className="similar-events pt-32 space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold uppercase tracking-tighter">Similar Events</h2>
          <div className="h-0.5 flex-1 mx-8 bg-gradient-to-r from-primary/30 to-transparent" />
        </div>
        <div className="events">
          {similarEvents.length > 0 ? (
            similarEvents.map((e: IEvent) => (
              <EventCard key={e.slug} {...e} />
            ))
          ) : (
            <p className="text-muted-foreground italic">Exploring more options for you soon...</p>
          )}
        </div>
      </div>
    </section>
  );
}

