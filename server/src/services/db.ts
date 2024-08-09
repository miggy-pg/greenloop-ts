import mongoose from "mongoose";

async function initDb() {
  await mongoose.connect(process.env.MONGO_URI || "");
  console.log("connected to MongoDB");
}

async function disconnectDb() {
  await mongoose.disconnect();
}

export { initDb, disconnectDb };
