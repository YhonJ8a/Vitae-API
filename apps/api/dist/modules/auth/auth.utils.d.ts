import { Response } from "express";
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const generateAccessToken: (userId: string) => string;
export declare const generateRefreshToken: (userId: string) => string;
export declare const setAuthCookies: (res: Response, accessToken: string, refreshToken: string) => void;
export declare const clearAuthCookies: (res: Response) => void;
//# sourceMappingURL=auth.utils.d.ts.map