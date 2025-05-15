import Item from '../Database/Item-Model.js'; 
import { initPinecone, index } from '../contextual-search/VectorDb-Connection.js';

import getEmbeddings from './Embeddings.js';

async function Add_Items(req, res) {
  const { name, description, price } = req.body;
  const imageFile = req.file;

  if (!name || !description || !price || !imageFile) {
    return res.status(400).json({ error: 'All fields including image are required' });
  }

  try {
  const imageUrl = imageFile.path;
  const newItem = await Item.create({
    name,
    description,
    price: parseFloat(price),
    image: imageUrl,
  });

  // Try Pinecone separately
  try {
  
    const embedding = await getEmbeddings(description)
    console.log(embedding)
    await index.upsert([
  {
    id: `product-${newItem.id}`,  // or just use newItem.id as string
    values: embedding,
    metadata: {
      id: newItem.id, // <- Add this
      name,
      price
    },
  },
]);

  } catch (pineconeErr) {
    console.error('Failed to add to Pinecone:', pineconeErr.message);
    // Continue without crashing
  }

  return res.status(201).json({
    message: 'Item added successfully',
    item: newItem,
  });

} catch (error) {
  console.error('Error inserting item:', error.message);
  res.status(500).json({ error: 'Internal Server Error' });
}

  //here writing the code for storing the data in vector database
  // try {
    

  //   res.status(200).json({ message: 'Product added to Pinecone' });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Error adding product to Pinecone' });
  // }
}

export default Add_Items;
