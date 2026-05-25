
import { Router } from "express";
import {
    fetchSkills,
    createSkill,
    editSkill,
    removeSkill,
} from "../../modules/profile/profile.controller";

const router = Router();

router.get("/", fetchSkills);
router.post("/", createSkill);
router.patch("/:id", editSkill);
router.delete("/:id", removeSkill);

export default router;