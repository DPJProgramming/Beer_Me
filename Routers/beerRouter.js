import express from "express";
import controller from "../Controllers/beerController.js";

const router = express.Router();
router.get("/", controller.allBeers);

export default router;