import mongoose from "mongoose";

let connectionPromise = null;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Variável MONGO_URI não configurada.");
  }

  if (!connectionPromise) {
    // Compartilha a tentativa em andamento e libera o cache ao terminar.
    connectionPromise = mongoose
      .connect(mongoUri, {
        dbName: process.env.MONGO_DB || "test",
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      .finally(() => {
        connectionPromise = null;
      });
  }

  await connectionPromise;

  return mongoose.connection;
}

export default connectDatabase;