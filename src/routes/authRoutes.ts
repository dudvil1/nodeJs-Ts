import { Router } from "express";
import { signUp, logIn, confirmUser, logOut } from "../controllers/authController";
import { verifyToken } from '../middlewares/authMiddleware';

const router: Router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/confirm", confirmUser);
router.post("/logout", verifyToken, logOut);

export default router;
