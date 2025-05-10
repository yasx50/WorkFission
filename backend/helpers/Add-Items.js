import Item from '../Database/Item-Model.js'; // PostgreSQL model (Sequelize or Prisma assumed)

async function Add_Items(req, res) {
  const { name, description, price } = req.body;
  const imageFile = req.file;

  if (!name || !description || !price || !imageFile) {
    return res.status(400).json({ error: 'All fields including image are required' });
  }

  try {
    const imageUrl = imageFile.path; // Cloudinary returns `path` as the secure URL
console.log(imageUrl)
    const newItem = await Item.create({
      name,
      description,
      price: parseFloat(price),
      image: imageUrl, // Store Cloudinary URL in DB
    });

    res.status(201).json({
      message: 'Item added successfully',
      item: newItem,
    });
  } catch (error) {
    console.error('Error inserting item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default Add_Items;
