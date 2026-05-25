import { Router } from "express";
import {
    fetchCompanies,
    createCompany,
    editCompany,
    removeCompany,
} from "../../modules/profile/profile.controller";

const router = Router();

router.get("/", fetchCompanies);
router.post("/", createCompany);
router.patch("/:id", editCompany);
router.delete("/:id", removeCompany);

export default router;