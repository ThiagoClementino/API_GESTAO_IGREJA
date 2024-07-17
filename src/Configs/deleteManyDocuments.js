async function deleteManyDocuments(collection) {
    const filter = { name: " " }; // Critério de filtro para deletar os documentos
    
    const result = await collection.deleteMany(filter);
    console.log(`${result.deletedCount} documentos foram deletados.`);
}
