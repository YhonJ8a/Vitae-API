import { Router } from "express";
import {
    fetchEducation,
    createEducation,
    editEducation,
    removeEducation,
} from "../../modules/profile/profile.controller";

const router = Router();

router.get("/", fetchEducation);
router.post("/", createEducation);
router.patch("/:id", editEducation);
router.delete("/:id", removeEducation);

export default router;
