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

const router = Router();

router.use(authMiddleware);

router.get("/", fetchProfile);
router.patch("/", editProfile);

router.use("/education", useEducation);

router.use("/experience", useExperience);

router.use("/companies", useCompanies);

router.use("/skills", useSkills);

router.use("/projects", useProjects);

export default router;
