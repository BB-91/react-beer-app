import Router from "express";
// import { getStudents, addStudent, getStudentById, deleteStudentById, getStudentByName } from "../controllers/studentController.js"
// import { getStudents, addStudent, getStudentById, deleteStudentById, getStudentByName } from "../controllers/beerController.js"
// import { getBeers, addBeer, getBeerById, deleteBeerById, getBeerByName } from "../controllers/beerController.js"
import { getBeers, addBeer } from "../controllers/beerController.js"
const router = Router();


router.get("/", getBeers);
router.post("/", addBeer);

// router.get("/:id", getBeerById);

// router.post("/", addBeer);

// router.get("/name/:name", getBeerByName);

export default router;