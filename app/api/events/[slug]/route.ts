import { NextResponse } from "next/server";
import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";

type RouteContext = {
  params: Promise<{ slug?: string }>;
};

// Slugs are normalized to lowercase words separated by single hyphens.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeSlug(value: string): string {
  return value.trim().toLowerCase();
}

function isValidSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    if (!slug || slug.trim().length === 0) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 },
      );
    }

    const normalizedSlug = normalizeSlug(slug);

    if (!isValidSlug(normalizedSlug)) {
      return NextResponse.json(
        {
          message:
            "Invalid slug format. Use lowercase letters, numbers, and hyphens only.",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const event = await Event.findOne({ slug: normalizedSlug }).lean();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected server error";

    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
