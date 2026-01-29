"use server";
import { Event } from "@/database";
import connectToDatabase from "../mongodb";
import { unstable_cache, revalidateTag } from "next/cache";
import { revalidatePath } from "next/navigation";

/**
 * CACHE: All Events
 * Revalidates when a new event is created.
 */
export const getAllEvents = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const events = await Event.find({}).sort({ createdAt: -1 }).lean();
      // Serialize ObjectIDs to strings for Client Components
      return JSON.parse(JSON.stringify(events));
    } catch (error) {
      console.error("Failed to fetch all events:", error);
      return [];
    }
  },
  ["all-events"],
  { tags: ["events"], revalidate: 3600 } // Cache for 1 hour, tag 'events'
);

/**
 * CACHE: Single Event by Slug
 */
export const getEventBySlug = unstable_cache(
  async (slug: string) => {
    try {
      await connectToDatabase();
      const event = await Event.findOne({ slug }).lean();
      if (!event) return null;
      return JSON.parse(JSON.stringify(event));
    } catch (error) {
      console.error(`Failed to fetch event ${slug}:`, error);
      return null;
    }
  },
  ["single-event"],
  { tags: ["events"], revalidate: 3600 }
);

/**
 * CACHE: Similar Events
 */
export const getSimilarEventsBySlug = unstable_cache(
  async (slug: string) => {
    try {
      await connectToDatabase();

      const event = await Event.findOne({ slug }).lean();
      if (!event) return [];

      const similarEvents = await Event.find({
        _id: { $ne: event._id },
        tags: { $in: event.tags },
      })
        .limit(3)
        .lean();

      return JSON.parse(JSON.stringify(similarEvents));
    } catch (error) {
      console.error("Failed to fetch similar events:", error);
      return [];
    }
  },
  ["similar-events"],
  { tags: ["events"], revalidate: 3600 }
);

/**
 * REVALIDATION: Clear event cache
 */
export const revalidateEvents = async () => {
  revalidateTag("events");
  revalidatePath("/");
};
