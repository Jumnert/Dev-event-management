"use client";

import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { useEffect, useState } from "react";

export default function Page() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10"
    >
      <div className="flex flex-col items-center text-center space-y-8 pt-20">
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-black !leading-tight tracking-tighter uppercase">
            The Pulse of <br />
            <span className="text-primary italic">Dev Events</span>
          </h1>
          <p className="text-light-200 text-xl md:text-2xl max-w-3xl mx-auto font-medium">
            Where Innovation Meets Opportunity. <br className="hidden md:block" />
            Hackathons, Meetups, and Conferences. All in one place.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4">
          <ExploreBtn />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} id="events" className="mt-40 space-y-12">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-4xl font-black uppercase tracking-tighter text-gradient">Featured Events</h3>
          <div className="h-0.5 flex-1 mx-8 bg-gradient-to-r from-primary/30 to-transparent" />
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] w-full rounded-xl bg-charcoal-blue-200/50 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <ul className="events">
            {events.length > 0 ? (
              events.map((event: IEvent) => (
                <motion.li
                  key={event._id.toString()}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="list-none"
                >
                  <EventCard {...event} />
                </motion.li>
              ))
            ) : (
              <div className="text-center py-20 bg-charcoal-blue-100/30 rounded-xl border border-dashed border-white/10">
                <p className="text-muted-foreground italic">No events found yet. Be the first to create one!</p>
              </div>
            )}
          </ul>
        )}
      </motion.div>
    </motion.section>
  );
}

