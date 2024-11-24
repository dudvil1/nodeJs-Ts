import { Router } from "express";
import { getGarage, addGarage } from "../controllers/garageController";
import { verifyToken } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get("/get", verifyToken, getGarage);
router.post("/add", verifyToken, addGarage);

export default router;
