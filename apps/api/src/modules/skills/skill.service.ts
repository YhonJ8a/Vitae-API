import { prisma } from "../../config/prisma";
import { Level } from "@prisma/client";

interface SkillDTO {
    name: string;
    level?: Level;
}

const getProfileId = async (userId: string): Promise<string> => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error("PROFILE_NOT_FOUND");
    return profile.id;
};

export const getSkills = async (userId: string) => {
    const profileId = await getProfileId(userId);
    return prisma.skill.findMany({ where: { profileId } });
};

export const addSkill = async (userId: string, data: SkillDTO) => {
    const profileId = await getProfileId(userId);
    return prisma.skill.create({
        data: { ...data, profileId },
    });
};

export const updateSkill = async (
    userId: string,
    skillId: string,
    data: Partial<SkillDTO>
) => {
    const profileId = await getProfileId(userId);
    const skill = await prisma.skill.findFirst({
        where: { id: skillId, profileId },
    });
    if (!skill) throw new Error("NOT_FOUND");
    return prisma.skill.update({ where: { id: skillId }, data });
};

export const deleteSkill = async (userId: string, skillId: string) => {
    const profileId = await getProfileId(userId);
    const skill = await prisma.skill.findFirst({
        where: { id: skillId, profileId },
    });
    if (!skill) throw new Error("NOT_FOUND");
    return prisma.skill.delete({ where: { id: skillId } });
};