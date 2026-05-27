import { z } from "zod";

export const updateProfileSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    bio: z.string().max(500).optional(),
    location: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().url("Invalid URL").optional(),
});

export const educationSchema = z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field is required"),
    startDate: z.string().datetime("Invalid date"),
    endDate: z.string().datetime("Invalid date").optional(),
    current: z.boolean().optional(),
    description: z.string().optional(),
});

export const experienceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().optional(),
    startDate: z.string().datetime("Invalid date"),
    endDate: z.string().datetime("Invalid date").optional(),
    current: z.boolean().optional(),
    description: z.string().optional(),
});

export const companySchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    startDate: z.string().datetime("Invalid date"),
    endDate: z.string().datetime("Invalid date").optional(),
    current: z.boolean().optional(),
    description: z.string().optional(),
});

export const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]).optional(),
});

export const projectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
    url: z.string().url("Invalid URL").optional(),
    repoUrl: z.string().url("Invalid URL").optional(),
    startDate: z.string().datetime("Invalid date"),
    endDate: z.string().datetime("Invalid date").optional(),
    current: z.boolean().optional(),
});