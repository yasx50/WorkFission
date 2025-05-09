// Add-Items.js
import Item from '../Database/Item-Model.js';

async function Add_Items(req, res) {
  const { name, description, price } = req.body;
  const imageFile = req.file;

  if (!name || !description || !price || !imageFile) {
    return res.status(400).json({ error: 'All fields including image are required' });
  }

  try {
    const imagePath = `/uploads/${imageFile.filename}`;

    const newItem = await Item.create({
      name,
      description,
      price,
      image: imagePath,
    });

    res.status(201).json({
      message: 'Item added successfully',
      item: newItem
    });
  } catch (error) {
    console.error('Error inserting item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default Add_Items;
