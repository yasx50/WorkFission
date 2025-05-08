import { Router } from "express";
const router = Router()

import Add_Items from '../helpers/Add-Items.js'
router.route("/add-items").post(Add_Items)

import getAllItems from '../helpers/Fetch-Items.js'
router.route("/all-items").get(getAllItems)

export default router