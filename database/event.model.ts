import mongoose, { Schema, model, Document } from "mongoose";

interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: [true, "Mode is required"],
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Agenda must have at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Tags must have at least one item",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook: generate slug from title and normalize date/time formats.
eventSchema.pre<IEvent>("save", function (next) {
  // Generate URL-friendly slug from title only if title changed or slug is missing.
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Normalize date to ISO format (YYYY-MM-DD).
  try {
    const parsedDate = new Date(this.date);
    if (!isNaN(parsedDate.getTime())) {
      this.date = parsedDate.toISOString().split("T")[0];
    }
  } catch {
    // Keep original date format if parsing fails.
  }

  // Normalize time to HH:mm format.
  if (this.time) {
    const timeMatch = this.time.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const hours = timeMatch[1].padStart(2, "0");
      const minutes = timeMatch[2];
      this.time = `${hours}:${minutes}`;
    }
  }

  next();
});

// Create unique index on slug to enforce uniqueness at database level.
eventSchema.index({ slug: 1 }, { unique: true, sparse: true });

export const Event =
  mongoose.models.Event || model<IEvent>("Event", eventSchema);
