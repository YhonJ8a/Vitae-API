import { Router } from "express";
import {
    fetchCompanies,
    createCompany,
    editCompany,
    removeCompany,
} from "../../modules/profile/profile.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { companySchema } from "../../modules/profile/profile.schema";

const router = Router();

router.get("/", fetchCompanies);
router.post("/", validate(companySchema), createCompany);
router.patch("/:id", validate(companySchema.partial()), editCompany);
router.delete("/:id", removeCompany);

export default router;