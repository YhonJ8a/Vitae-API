import { Router } from "express";
import {
    fetchProjects,
    createProject,
    editProject,
    removeProject,
} from "../../modules/profile/profile.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { projectSchema } from "../../modules/profile/profile.schema";

const router = Router();

router.get("/", fetchProjects);
router.post("/", validate(projectSchema), createProject);
router.patch("/:id", validate(projectSchema.partial()), editProject);
router.delete("/:id", removeProject);

export default router;