import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        dbName: "test",
      }
    );

    console.log(
      "MongoDB conectado com sucesso"
    );
  } catch (err) {
    console.error(
      "Erro ao conectar ao MongoDB:",
      err
    );

    throw err;
  }
}

export default connectDatabase;