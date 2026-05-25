import { Request, Response } from "express";
import { getProfile, updateProfile } from "./profile.service";
import {
    getEducation,
    addEducation,
    updateEducation,
    deleteEducation,
} from "../educarion/education.service";
import {
    getExperience,
    addExperience,
    updateExperience,
    deleteExperience,
} from "../experience/experience.service";
import {
    getCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
} from "../company/company.service";
import { successResponse, errorResponse } from "../../common/utils/response.util";
import { getSkills, addSkill, updateSkill, deleteSkill } from "../skills/skill.service";
import { getProjects, addProject, updateProject, deleteProject } from "../project/project.service";


// --- Experience ---
export const fetchExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const experience = await getExperience(req.userId);
        res.json(successResponse(experience, "Experience fetched", { count: experience.length }));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const experience = await addExperience(req.userId, req.body);
        res.status(201).json(successResponse(experience, "Experience added"));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const editExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const experience = await updateExperience(req.userId, req.params.id as string, req.body);
        res.json(successResponse(experience, "Experience updated"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Experience not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

export const removeExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteExperience(req.userId, req.params.id as string);
        res.json(successResponse(null, "Experience deleted"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Experience not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

// --- Companies ---
export const fetchCompanies = async (req: Request, res: Response): Promise<void> => {
    try {
        const companies = await getCompanies(req.userId);
        res.json(successResponse(companies, "Companies fetched", { count: companies.length }));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const createCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const company = await addCompany(req.userId, req.body);
        res.status(201).json(successResponse(company, "Company added"));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const editCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const company = await updateCompany(req.userId, req.params.id as string, req.body);
        res.json(successResponse(company, "Company updated"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Company not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

export const removeCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteCompany(req.userId, req.params.id as string);
        res.json(successResponse(null, "Company deleted"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Company not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

// --- Skills ---
export const fetchSkills = async (req: Request, res: Response): Promise<void> => {
    try {
        const skills = await getSkills(req.userId);
        res.json(successResponse(skills, "Skills fetched", { count: skills.length }));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const skill = await addSkill(req.userId, req.body);
        res.status(201).json(successResponse(skill, "Skill added"));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const editSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const skill = await updateSkill(req.userId, req.params.id as string, req.body);
        res.json(successResponse(skill, "Skill updated"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Skill not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

export const removeSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteSkill(req.userId, req.params.id as string);
        res.json(successResponse(null, "Skill deleted"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Skill not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

// --- Projects ---
export const fetchProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await getProjects(req.userId);
        res.json(successResponse(projects, "Projects fetched", { count: projects.length }));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await addProject(req.userId, req.body);
        res.status(201).json(successResponse(project, "Project added"));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const editProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await updateProject(req.userId, req.params.id as string, req.body);
        res.json(successResponse(project, "Project updated"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Project not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

export const removeProject = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteProject(req.userId, req.params.id as string);
        res.json(successResponse(null, "Project deleted"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Project not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

// --- Profile ---
export const fetchProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await getProfile(req.userId);
        res.json(successResponse(profile, "Profile fetched"));
    } catch {
        res.status(404).json(errorResponse("Profile not found"));
    }
};

export const editProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await updateProfile(req.userId, req.body);
        res.json(successResponse(profile, "Profile updated"));
    } catch {
        res.status(500).json(errorResponse());
    }
};

// --- Education ---
export const fetchEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const education = await getEducation(req.userId);
        res.json(successResponse(education, "Education fetched", { count: education.length }));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const createEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const education = await addEducation(req.userId, req.body);
        res.status(201).json(successResponse(education, "Education added"));
    } catch {
        res.status(500).json(errorResponse());
    }
};

export const editEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const education = await updateEducation(req.userId, req.params.id as string, req.body);
        res.json(successResponse(education, "Education updated"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Education not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};

export const removeEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteEducation(req.userId, req.params.id as string);
        res.json(successResponse(null, "Education deleted"));
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NOT_FOUND") {
            res.status(404).json(errorResponse("Education not found"));
            return;
        }
        res.status(500).json(errorResponse());
    }
};