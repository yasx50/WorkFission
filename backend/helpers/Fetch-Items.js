import Item from '../Database/Item-Model.js'; // Adjust the path if needed

async function getAllItems(req, res) {
  try {
    // Fetch all records from the 'Item' table
    const items = await Item.findAll();

    // Check if there are items
    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }

    // Return the items in the response
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default getAllItems;
