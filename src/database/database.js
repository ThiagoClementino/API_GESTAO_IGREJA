import mongoose from "mongoose";

let connectionPromise = null;

async function connectDatabase() {
  if (
    mongoose.connection.readyState === 1
  ) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error(
      "Variável MONGO_URI não configurada."
    );
  }

  if (!connectionPromise) {
    connectionPromise =
      mongoose
        .connect(
          process.env.MONGO_URI,
          {
            dbName: "test",
          }
        )
        .catch((erro) => {
          connectionPromise = null;
          throw erro;
        });
  }

  await connectionPromise;

  return mongoose.connection;
}

export default connectDatabase;