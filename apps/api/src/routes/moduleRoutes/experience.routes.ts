import { Router } from "express";
import {
    fetchExperience,
    createExperience,
    editExperience,
    removeExperience,
} from "../../modules/profile/profile.controller";

const router = Router();

router.get("/", fetchExperience);
router.post("/", createExperience);
router.patch("/:id", editExperience);
router.delete("/:id", removeExperience);

export default router;