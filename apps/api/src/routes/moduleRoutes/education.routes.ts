import { Router } from "express";
import {
    fetchEducation,
    createEducation,
    editEducation,
    removeEducation,
} from "../../modules/profile/profile.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { educationSchema } from "../../modules/profile/profile.schema";

const router = Router();

router.get("/", fetchEducation);
router.post("/", validate(educationSchema), createEducation);
router.patch("/:id", validate(educationSchema.partial()), editEducation);
router.delete("/:id", removeEducation);

export default router;
