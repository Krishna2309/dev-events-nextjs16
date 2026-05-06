import mongoose, { Schema, model, Document, Types } from "mongoose";
import { Event } from "./event.model";

interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook: validate that the referenced event exists.
bookingSchema.pre<IBooking>("save", async function (next) {
  if (this.isModified("eventId") || this.isNew) {
    const eventExists = await Event.findById(this.eventId);
    if (!eventExists) {
      next(new Error("Referenced event does not exist"));
      return;
    }
  }
  next();
});

// Index on eventId for faster queries and to support foreign key lookups.
bookingSchema.index({ eventId: 1 });

export const Booking =
  mongoose.models.Booking || model<IBooking>("Booking", bookingSchema);
