import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import useEducation from "./education.routes";
import useExperience from "./experience.routes";
import useCompanies from "./companies.routes";
import useSkills from "./skills.routes";
import useProjects from "./projects.reutes";
import {
    fetchProfile,
    editProfile
} from "../../modules/profile/profile.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { updateProfileSchema } from "../../modules/profile/profile.schema";

const router = Router();

router.use(authMiddleware);

router.get("/", fetchProfile);
router.patch("/", validate(updateProfileSchema), editProfile);

router.use("/education", useEducation);

router.use("/experience", useExperience);

router.use("/companies", useCompanies);

router.use("/skills", useSkills);

router.use("/projects", useProjects);

export default router;
