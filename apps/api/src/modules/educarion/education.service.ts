import { prisma } from "../../config/prisma";

interface EducationDTO {
    institution: string;
    degree: string;
    field: string;
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

export const getEducation = async (userId: string) => {
    const profileId = await getProfileId(userId);
    return prisma.education.findMany({ where: { profileId } });
};

export const addEducation = async (userId: string, data: EducationDTO) => {
    const profileId = await getProfileId(userId);
    return prisma.education.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
            profileId,
        },
    });
};

export const updateEducation = async (
    userId: string,
    educationId: string,
    data: Partial<EducationDTO>
) => {
    const profileId = await getProfileId(userId);
    const education = await prisma.education.findFirst({
        where: { id: educationId, profileId },
    });
    if (!education) throw new Error("NOT_FOUND");

    return prisma.education.update({
        where: { id: educationId },
        data: {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
        },
    });
};

export const deleteEducation = async (userId: string, educationId: string) => {
    const profileId = await getProfileId(userId);
    const education = await prisma.education.findFirst({
        where: { id: educationId, profileId },
    });
    if (!education) throw new Error("NOT_FOUND");

    return prisma.education.delete({ where: { id: educationId } });
};