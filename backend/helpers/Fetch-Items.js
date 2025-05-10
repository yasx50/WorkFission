import Item from '../Database/Item-Model.js'; // Adjust path if needed

async function getAllItems(req, res) {
  try {
    const items = await Item.findAll();

    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }

    // Construct full image URLs
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // fallback
    const updatedItems = items.map(item => ({
      ...item.toJSON(),
      image: `${baseUrl}/uploads/${item.image}`, // assuming item.image = filename
    }));

    res.status(200).json(updatedItems);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default getAllItems;
