import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import {
    fetchProfile,
    editProfile,
    fetchEducation,
    createEducation,
    editEducation,
    removeEducation,
} from "./profile.controller";

const router = Router();

router.use(authMiddleware);

// Profile
router.get("/", fetchProfile);
router.patch("/", editProfile);

// Education
router.get("/education", fetchEducation);
router.post("/education", createEducation);
router.patch("/education/:id", editEducation);
router.delete("/education/:id", removeEducation);

export default router;
