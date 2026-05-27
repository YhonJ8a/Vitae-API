
import { Router } from "express";
import {
    fetchSkills,
    createSkill,
    editSkill,
    removeSkill,
} from "../../modules/profile/profile.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { skillSchema } from "../../modules/profile/profile.schema";

const router = Router();

router.get("/", fetchSkills);
router.post("/", validate(skillSchema), createSkill);
router.patch("/:id", validate(skillSchema.partial()), editSkill);
router.delete("/:id", removeSkill);

export default router;