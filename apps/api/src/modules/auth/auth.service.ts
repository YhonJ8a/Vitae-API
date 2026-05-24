import { prisma } from "../../config/prisma";
import {
    hashPassword,
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
} from "./auth.utils";

interface RegisterDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface LoginDTO {
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterDTO) => {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new Error("EMAIL_TAKEN");

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashed,
            profile: {
                create: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                },
            },
        },
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.session.create({
        data: {
            userId: user.id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });

    return { accessToken, refreshToken };
};

export const loginUser = async (data: LoginDTO, meta: { ip?: string; userAgent?: string }) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.password) throw new Error("INVALID_CREDENTIALS");

    const valid = await comparePassword(data.password, user.password);
    if (!valid) throw new Error("INVALID_CREDENTIALS");

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.session.create({
        data: {
            userId: user.id,
            refreshToken,
            ip: meta.ip,
            userAgent: meta.userAgent,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });

    return { accessToken, refreshToken };
};

export const refreshSession = async (refreshToken: string) => {
    const session = await prisma.session.findUnique({ where: { refreshToken } });
    if (!session || session.expiresAt < new Date()) throw new Error("INVALID_SESSION");

    const accessToken = generateAccessToken(session.userId);

    await prisma.session.update({
        where: { refreshToken },
        data: { lastActivity: new Date() },
    });

    return { accessToken };
};

export const logoutUser = async (refreshToken: string) => {
    await prisma.session.deleteMany({ where: { refreshToken } });
};

export const findOrCreateGoogleUser = async (googleProfile: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
}) => {
    let user = await prisma.user.findUnique({ where: { email: googleProfile.email } });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: googleProfile.email,
                password: "",
                profile: {
                    create: {
                        firstName: googleProfile.firstName,
                        lastName: googleProfile.lastName,
                    },
                },
            },
        });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.session.create({
        data: {
            userId: user.id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });

    return { accessToken, refreshToken };
};
