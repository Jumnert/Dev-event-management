/**
 * lib/mongodb.ts
 *
 * Typed Mongoose connection helper for Next.js (TypeScript).
 * - Validates `process.env.MONGODB_URI`.
 * - Caches the connection on the global object to avoid
 *   creating multiple Mongoose connections during development
 *   (Next.js hot reloads can re-run module code).
 * - Exports an async `connectToDatabase` function that resolves
 *   to a `mongoose.Connection` instance.
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Define the shape of the cache stored on the global namespace.
type MongooseCache = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

// Use an existing cache if present (hot reload), otherwise create one.
const cache: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global._mongooseCache) {
  global._mongooseCache = cache;
}

/**
 * Connect to MongoDB using Mongoose.
 *
 * Returns an open `mongoose.Connection`. The connection is cached on the
 * Node global object to prevent creating new connections when the module
 * is re-evaluated (e.g. during Next.js HMR in development).
 */
export async function connectToDatabase(): Promise<mongoose.Connection> {
  // If we already have a cached connection, return it.
  if (cache.conn) {
    return cache.conn;
  }

  // If there's no connection promise yet, create one.
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI!, {
        // Recommended options; many are defaults in recent mongoose versions.
        // `bufferCommands: false` disables mongoose buffering when disconnected.
        bufferCommands: false,
        appName: "event-management-nextjs",
      })
      .then((m) => m.connection);
  }

  // Await the connection promise and cache the resolved connection.
  cache.conn = await cache.promise;
  return cache.conn;
}

/**
 * Convenience default export for backward compatibility.
 * Example usage:
 *   import connectToDatabase from 'lib/mongodb';
 *   const db = await connectToDatabase();
 */
export default connectToDatabase;
