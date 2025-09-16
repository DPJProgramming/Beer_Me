import express from "express";
import controller from "../controllers/beerController.js";

const router = express.Router();
router.get("/", controller.allBeers);
router.post("/addBeer", controller.addBeer);

export default router;