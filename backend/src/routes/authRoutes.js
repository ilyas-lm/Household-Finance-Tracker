import express from 'express';
import { registerUser, LoginUser, getMe } from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "Auth route is working" });
});


router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get("/me", protect, getMe);

export default router;
