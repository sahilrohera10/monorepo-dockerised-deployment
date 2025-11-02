// Core package entry point

import { connectToDatabase } from "@monorepo/shared";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from core-package!");
});

// Connect to database and start server
const start = async () => {
  try {
    const db = await connectToDatabase();

    app.listen(3001, () => {
      console.log("🚀 Core package is running on http://localhost:3001");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

export function coreFunction() {
  return "Hello from core-package!";
}
