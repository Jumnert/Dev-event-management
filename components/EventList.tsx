"use client";

import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

interface EventListProps {
    initialEvents: IEvent[];
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function EventList({ initialEvents }: EventListProps) {
    if (initialEvents.length === 0) {
        return (
            <div className="text-center py-20 bg-charcoal-blue-100/30 rounded-xl border border-dashed border-white/10">
                <p className="text-muted-foreground italic">No events found yet. Be the first to create one!</p>
            </div>
        );
    }

    return (
        <ul className="events">
            {initialEvents.map((event: any) => (
                <motion.li
                    key={event._id.toString()}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="list-none"
                >
                    <EventCard {...event} />
                </motion.li>
            ))}
        </ul>
    );
}
