import { Request, Response } from "express";
import { getProfile, updateProfile } from "./profile.service";
import {
    getEducation,
    addEducation,
    updateEducation,
    deleteEducation,
} from "./education.service";
import { successResponse, errorResponse } from "../../common/utils/response.util";

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