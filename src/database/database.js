import mongoose from "mongoose";

async function deleteManyDocuments(collection) {
  const result = await collection.deleteMany({});
  console.log(
    `Deleted ${result.deletedCount} documents in the ${collection.collectionName} collection.`
  );
}

async function connectDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://thidf57:1HjERWrA67Y0LczT@gerenciador-de-membros.ua4raq8.mongodb.net/?appName=Gerenciador-de-Membros"
    );
  } catch (err) {
    console.error(err);
  }
}
export default connectDatabase;
