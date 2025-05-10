import { Router } from "express";
import { upload } from '../helpers/Cloudinary-Config.js'; // Cloudinary multer setup
import Add_Items from '../helpers/Add-Items.js';
import getAllItems from '../helpers/Fetch-Items.js';

const router = Router();

// Route to add a new item with image upload
router.post("/add-items", upload.single('image'), Add_Items);

// Route to fetch all items
router.get("/all-items", getAllItems);

export default router;
