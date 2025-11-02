/**
 * Shared database connection utility
 * Ensures all packages in the monorepo share the same database connection
 */

import config from "../config/env.js";

let mongooseInstance = null;
let isConnected = false;

const connectToDatabase = async (connectionString = config.db.connectionString) => {
  // If already connected, return existing connection
  if (isConnected && mongooseInstance) {
    console.log("✅ Using existing database connection");
    return mongooseInstance;
  }

  try {
    const mongoose = await import("mongoose");
    
    // Connect to MongoDB with configuration options
    await mongoose.default.connect(connectionString, config.db.options);
    
    mongooseInstance = mongoose.default;
    isConnected = true;
    console.log("✅ Connected to database");
    
    return mongooseInstance;
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    isConnected = false;
    mongooseInstance = null;
    throw error;
  }
};

/**
 * Disconnect from the database
 */
const disconnectFromDatabase = async () => {
  if (isConnected && mongooseInstance) {
    try {
      await mongooseInstance.disconnect();
      isConnected = false;
      mongooseInstance = null;
      console.log("✅ Disconnected from database");
    } catch (error) {
      console.error("❌ Database disconnection error:", error.message);
      throw error;
    }
  }
};

export { connectToDatabase, disconnectFromDatabase, mongooseInstance };
export default connectToDatabase;

