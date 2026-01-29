import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export default function EventCard({
  title,
  image,
  slug,
  location,
  date,
  time,
}: Props) {
  return (
    <Link href={`/events/${slug}`} className="group">
      <div id="event-card" className="flex flex-col gap-5 rounded-xl overflow-hidden bg-card border border-border/40 hover:border-primary/50 transition-all duration-500 card-shadow p-3">
        <div className="relative h-[250px] w-full rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-blue-100/80 via-transparent to-transparent opacity-60" />
        </div>

        <div className="space-y-4 px-1">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
            <Image src="/icons/pin.svg" alt="location" width={12} height={12} className="brightness-125" />
            <span>{location}</span>
          </div>

          <h4 className="text-xl font-bold leading-tight line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors duration-300 text-foreground">
            {title}
          </h4>

          <div className="datetime flex flex-row items-center gap-6 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 opacity-60">
              <Image src="/icons/calendar.svg" alt="date" width={14} height={14} className="invert brightness-200" />
              <p className="text-xs font-medium text-muted-foreground">{date}</p>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <Image src="/icons/clock.svg" alt="time" width={14} height={14} className="invert brightness-200" />
              <p className="text-xs font-medium text-muted-foreground">{time}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
