"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateGoogleUser = exports.logoutUser = exports.refreshSession = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = require("../../config/prisma");
const auth_utils_1 = require("./auth.utils");
const registerUser = async (data) => {
    const exists = await prisma_1.prisma.user.findUnique({ where: { email: data.email } });
    if (exists)
        throw new Error("EMAIL_TAKEN");
    const hashed = await (0, auth_utils_1.hashPassword)(data.password);
    const user = await prisma_1.prisma.user.create({
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
    const accessToken = (0, auth_utils_1.generateAccessToken)(user.id);
    const refreshToken = (0, auth_utils_1.generateRefreshToken)(user.id);
    await prisma_1.prisma.session.create({
        data: {
            userId: user.id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return { accessToken, refreshToken };
};
exports.registerUser = registerUser;
const loginUser = async (data, meta) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.password)
        throw new Error("INVALID_CREDENTIALS");
    const valid = await (0, auth_utils_1.comparePassword)(data.password, user.password);
    if (!valid)
        throw new Error("INVALID_CREDENTIALS");
    const accessToken = (0, auth_utils_1.generateAccessToken)(user.id);
    const refreshToken = (0, auth_utils_1.generateRefreshToken)(user.id);
    await prisma_1.prisma.session.create({
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
exports.loginUser = loginUser;
const refreshSession = async (refreshToken) => {
    const session = await prisma_1.prisma.session.findUnique({ where: { refreshToken } });
    if (!session || session.expiresAt < new Date())
        throw new Error("INVALID_SESSION");
    const accessToken = (0, auth_utils_1.generateAccessToken)(session.userId);
    await prisma_1.prisma.session.update({
        where: { refreshToken },
        data: { lastActivity: new Date() },
    });
    return { accessToken };
};
exports.refreshSession = refreshSession;
const logoutUser = async (refreshToken) => {
    await prisma_1.prisma.session.deleteMany({ where: { refreshToken } });
};
exports.logoutUser = logoutUser;
const findOrCreateGoogleUser = async (googleProfile) => {
    let user = await prisma_1.prisma.user.findUnique({ where: { email: googleProfile.email } });
    if (!user) {
        user = await prisma_1.prisma.user.create({
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
    const accessToken = (0, auth_utils_1.generateAccessToken)(user.id);
    const refreshToken = (0, auth_utils_1.generateRefreshToken)(user.id);
    await prisma_1.prisma.session.create({
        data: {
            userId: user.id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return { accessToken, refreshToken };
};
exports.findOrCreateGoogleUser = findOrCreateGoogleUser;
//# sourceMappingURL=auth.service.js.map