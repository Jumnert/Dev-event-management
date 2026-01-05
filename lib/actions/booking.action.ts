"use server";
import Booking from "@/database/booking.model";
import connectToDatabase from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase;

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await Booking.findOne({ eventId, email: normalizedEmail });
    if (existing) {
      return { success: false, message: "You have already booked this event." };
    }

    const bookingDoc = await Booking.create({
      eventId,
      slug,
      email: normalizedEmail,
    });

    // Convert to plain object and only keep serializable fields
    const booking = {
      id: bookingDoc._id.toString(),
      eventId: bookingDoc.eventId.toString(),
      email: bookingDoc.email,
      createdAt: bookingDoc.createdAt,
      updatedAt: bookingDoc.updatedAt,
    };

    return { success: true, booking };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null) {
      const errObj = error as {
        message?: string;
        code?: number;
        [key: string]: unknown;
      };
      if (errObj.code === 11000) {
        return { success: false, message: "Booking already exists." };
      }
      return {
        success: false,
        message: errObj.message ?? "Something went wrong.",
      };
    }
    return { success: false, message: "Something went wrong." };
  }
};
