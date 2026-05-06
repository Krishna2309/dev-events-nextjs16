import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

function getMongoUri(): string {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  return MONGODB_URI;
}

// Global is used here to maintain a cached connection across hot reloads in development. This prevents connections from growing exponentially during API Route usage.
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalForMongoose = globalThis as typeof globalThis & {
  __mongooseCache?: MongooseCache;
};

// Reuse the same cache across hot reloads in development.
const cached = globalForMongoose.__mongooseCache ?? {
  conn: null,
  promise: null,
};

globalForMongoose.__mongooseCache = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  const mongoUri = getMongoUri();

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Create the initial connection once and share the in-flight promise.
    cached.promise = mongoose.connect(mongoUri);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
