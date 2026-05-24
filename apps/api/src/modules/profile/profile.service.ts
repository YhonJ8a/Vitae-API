import { prisma } from "../../config/prisma";

interface UpdateProfileDTO {
    firstName?: string;
    lastName?: string;
    bio?: string;
    location?: string;
    phone?: string;
    website?: string;
}

export const getProfile = async (userId: string) => {
    const profile = await prisma.profile.findUnique({
        where: { userId },
        include: {
            education: true,
            experience: true,
            companies: true,
            skills: true,
            projects: true,
        },
    });

    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    return profile;
};

export const updateProfile = async (userId: string, data: UpdateProfileDTO) => {
    const profile = await prisma.profile.update({
        where: { userId },
        data: { ...data, updatedAt: new Date() },
    });

    return profile;
};