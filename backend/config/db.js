const mongoose = require("mongoose");
const dns = require("dns");

try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  console.warn("DNS setup warning:", e.message);
}

const mongooseOptions = {
  dbName: "thirdeye",
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  maxPoolSize: 20,
  retryWrites: true,
};

let isConnecting = false;
let reconnectTimer = null;

const connectDB = async (retryCount = 0) => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  if (isConnecting) {
    return false;
  }

  isConnecting = true;
  try {
    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    console.log("MongoDB connected successfully");
    isConnecting = false;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    return true;
  } catch (err) {
    isConnecting = false;
    console.error(`MongoDB connection failed (attempt ${retryCount + 1}):`, err.message);

    // Exponential backoff retry up to 10s
    const delay = Math.min(2000 * Math.pow(1.5, Math.min(retryCount, 5)), 10000);
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => {
      connectDB(retryCount + 1);
    }, delay);
    return false;
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB connection disconnected. Triggering auto-reconnect...");
  if (!isConnecting) {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => connectDB(0), 3000);
  }
});

mongoose.connection.on("reconnected", async () => {
  console.log("MongoDB connection re-established.");
  try {
    const MediaStore = require("../storage/mediaStore");
    await MediaStore.syncSlots(true);
  } catch (err) {
    console.warn("Post-reconnect slot sync warning:", err.message);
  }
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection stream error:", err.message);
});

const getDBStatus = () => mongoose.connection.readyState === 1;

const ensureConnected = async () => {
  if (getDBStatus()) return true;
  return await connectDB(0);
};

module.exports = { connectDB, getDBStatus, ensureConnected };
