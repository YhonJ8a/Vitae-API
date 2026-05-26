import { Router } from "express";
import {
    fetchExperience,
    createExperience,
    editExperience,
    removeExperience,
} from "../../modules/profile/profile.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { experienceSchema } from "../../modules/profile/profile.schema";

const router = Router();

router.get("/", fetchExperience);
router.post("/", validate(experienceSchema), createExperience);
router.patch("/:id", validate(experienceSchema.partial()), editExperience);
router.delete("/:id", removeExperience);

export default router;