import Item from '../Database/Item-Model.js'; // Adjust the import as necessary

async function Add_Items(req, res) {
  const { name, description, price, image } = req.body;

  // Check if any fields are empty
  if (!name || !description || !price || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new item entry using the Sequelize model
    const newItem = await Item.create({
      name,
      description,
      price,
      image,
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
