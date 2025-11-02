/**
 * Environment configuration
 * Loads and provides access to environment variables
 */

const config = {
  port: process.env.PORT || 3000,
  db: {
    connectionString:
      process.env.MONGODB_URI || "mongodb://mongoDB:27017/monorepo_deployment",
    options: {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    },
  },
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV !== "production",
  isProduction: process.env.NODE_ENV === "production",
};

export default config;
