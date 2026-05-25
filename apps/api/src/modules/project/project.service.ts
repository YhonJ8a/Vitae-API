import { prisma } from "../../config/prisma";

interface ProjectDTO {
    name: string;
    description?: string;
    url?: string;
    repoUrl?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
}

const getProfileId = async (userId: string): Promise<string> => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    return profile.id;
};

export const getProjects = async (userId: string) => {
    const profileId = await getProfileId(userId);
    return prisma.project.findMany({ where: { profileId } });
};

export const addProject = async (userId: string, data: ProjectDTO) => {
    const profileId = await getProfileId(userId);
    return prisma.project.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
            profileId,
        },
    });
};

export const updateProject = async (
    userId: string,
    projectId: string,
    data: Partial<ProjectDTO>
) => {
    const profileId = await getProfileId(userId);
    const project = await prisma.project.findFirst({
        where: { id: projectId, profileId },
    });
    if (!project) throw new Error("NOT_FOUND");

    return prisma.project.update({
        where: { id: projectId },
        data: {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
        },
    });
};

export const deleteProject = async (userId: string, projectId: string) => {
    const profileId = await getProfileId(userId);
    const project = await prisma.project.findFirst({
        where: { id: projectId, profileId },
    });
    if (!project) throw new Error("NOT_FOUND");
    return prisma.project.delete({ where: { id: projectId } });
};

