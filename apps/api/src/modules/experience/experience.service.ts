import { prisma } from "../../config/prisma";

interface ExperienceDTO {
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
}

const getProfileId = async (userId: string): Promise<string> => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    return profile.id;
};

export const getExperience = async (userId: string) => {
    const profileId = await getProfileId(userId);
    return prisma.experience.findMany({ where: { profileId } });
};

export const addExperience = async (userId: string, data: ExperienceDTO) => {
    const profileId = await getProfileId(userId);
    return prisma.experience.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
            profileId,
        },
    });
};

export const updateExperience = async (
    userId: string,
    experienceId: string,
    data: Partial<ExperienceDTO>
) => {
    const profileId = await getProfileId(userId);
    const experience = await prisma.experience.findFirst({
        where: { id: experienceId, profileId },
    });
    if (!experience) throw new Error("NOT_FOUND");

    return prisma.experience.update({
        where: { id: experienceId },
        data: {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
        },
    });
};

export const deleteExperience = async (userId: string, experienceId: string) => {
    const profileId = await getProfileId(userId);
    const experience = await prisma.experience.findFirst({
        where: { id: experienceId, profileId },
    });
    if (!experience) throw new Error("NOT_FOUND");
    return prisma.experience.delete({ where: { id: experienceId } });
};