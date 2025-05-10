import { Router } from "express";
import { upload } from '../helpers/Cloudinary-Config.js'; 
import Add_Items from '../helpers/Add-Items.js';
import getAllItems from '../helpers/Fetch-Items.js';

const router = Router();

router.post("/add-items", upload.single('image'), Add_Items);


router.get("/all-items", getAllItems);

export default router;
