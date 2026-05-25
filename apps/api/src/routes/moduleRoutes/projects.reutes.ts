import { Router } from "express";
import {
    fetchProjects,
    createProject,
    editProject,
    removeProject,
} from "../../modules/profile/profile.controller";

const router = Router();

router.get("/", fetchProjects);
router.post("/", createProject);
router.patch("/:id", editProject);
router.delete("/:id", removeProject);

export default router;