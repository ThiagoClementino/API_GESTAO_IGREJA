import mongoose from 'mongoose';

async function deleteManyDocuments(collection) {
  const result = await collection.deleteMany({});
  console.log(`Deleted ${result.deletedCount} documents in the ${collection.collectionName} collection.`);
}

async function connectDatabase  () {
try{
   await mongoose.connect('mongodb+srv://thidf57:NwNUqHeirjup8qZY@Gerenciador-de-Membros.ua4raq8.mongodb.net/?retryWrites=true&w=majority&appName=Gerenciador-de-Membros');
   
} catch(err) {
    console.error(err);
   


}} 
export default connectDatabase