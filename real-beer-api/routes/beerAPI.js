import Router from "express";
import { getBeers, addBeer } from "../controllers/beerController.js"
const router = Router();

router.get("/", getBeers);
router.post("/", addBeer);

export default router;