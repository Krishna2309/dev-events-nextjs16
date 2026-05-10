"use server";

import connectToDatabase from "../mongodb";
import { Event } from "@/database";

export interface SimilarEventCardData {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const getSImilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findOne({ slug: slug });

    const similarEvents = await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags || [] },
    })
      .select("title image slug location date time")
      .limit(3)
      .lean<SimilarEventCardData[]>();

    return similarEvents;
  } catch (error) {
    console.error("Error fetching similar events:", error);
    return [] as SimilarEventCardData[];
  }
};
