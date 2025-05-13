import Item from '../Database/Item-Model.js'; 
import { initPinecone, index } from '../contextual-search/VectorDb-Connection.js';

async function Add_Items(req, res) {
  const { name, description, price } = req.body;
  const imageFile = req.file;

  if (!name || !description || !price || !imageFile) {
    return res.status(400).json({ error: 'All fields including image are required' });
  }

  try {
    const imageUrl = imageFile.path; 
  console.log(imageUrl)
    const newItem = await Item.create({
      name,
      description,
      price: parseFloat(price),
      image: imageUrl, 
    });

    res.status(201).json({
      message: 'Item added successfully',
      item: newItem,
    });
  } catch (error) {
    console.error('Error inserting item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  //here writing the code for storing the data in vector database
  try {
    await index.upsert([
      {
        id: `product-${Date.now()}`, // Unique ID, or use your own product ID
        values: { text: description }, // This is the field Pinecone embeds
        metadata: {
          name,
          price,
        },
      },
    ]);

    res.status(200).json({ message: 'Product added to Pinecone' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding product to Pinecone' });
  }
}

export default Add_Items;
