// Example package entry point

import { connectToDatabase } from "@monorepo/shared";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from example-package!");
});

// Connect to database and start server
const start = async () => {
  try {
    const db = await connectToDatabase();

    app.listen(3000, () => {
      console.log("🚀 Example package is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

export function exampleFunction() {
  return "Hello from example-package!";
}
