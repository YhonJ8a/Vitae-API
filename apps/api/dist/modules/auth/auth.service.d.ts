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
export declare const registerUser: (data: RegisterDTO) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const loginUser: (data: LoginDTO, meta: {
    ip?: string;
    userAgent?: string;
}) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const refreshSession: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
export declare const logoutUser: (refreshToken: string) => Promise<void>;
export declare const findOrCreateGoogleUser: (googleProfile: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
}) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map