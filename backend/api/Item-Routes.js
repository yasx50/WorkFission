import { Router } from "express";
import { upload } from '../helpers/Image-Hander.js';
const router = Router()

import Add_Items from '../helpers/Add-Items.js'
router.route("/add-items").post(upload.single('image'), Add_Items);

import getAllItems from '../helpers/Fetch-Items.js'
router.route("/all-items").get(getAllItems)

export default router