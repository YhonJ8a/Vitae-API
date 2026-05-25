import { prisma } from "../../config/prisma";

interface CompanyDTO {
    name: string;
    role: string;
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

export const getCompanies = async (userId: string) => {
    const profileId = await getProfileId(userId);
    return prisma.company.findMany({ where: { profileId } });
};

export const addCompany = async (userId: string, data: CompanyDTO) => {
    const profileId = await getProfileId(userId);
    return prisma.company.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
            profileId,
        },
    });
};

export const updateCompany = async (
    userId: string,
    companyId: string,
    data: Partial<CompanyDTO>
) => {
    const profileId = await getProfileId(userId);
    const company = await prisma.company.findFirst({
        where: { id: companyId, profileId },
    });
    if (!company) throw new Error("NOT_FOUND");

    return prisma.company.update({
        where: { id: companyId },
        data: {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
        },
    });
};

export const deleteCompany = async (userId: string, companyId: string) => {
    const profileId = await getProfileId(userId);
    const company = await prisma.company.findFirst({
        where: { id: companyId, profileId },
    });
    if (!company) throw new Error("NOT_FOUND");
    return prisma.company.delete({ where: { id: companyId } });
};