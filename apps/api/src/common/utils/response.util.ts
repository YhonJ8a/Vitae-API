interface Meta {
    count?: number;
    page?: number;
    limit?: number;
    total?: number;
    pages?: number;
}

interface ApiResponse<T> {
    status: "success" | "error";
    ok: boolean;
    data: T | null;
    meta: Meta;
    message: string;
    timestamp: string;
}

const defaultMeta: Meta = {
    count: 0,
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
};

export const successResponse = <T>(
    data: T,
    message = "Success",
    meta: Partial<Meta> = {}
): ApiResponse<T> => ({
    status: "success",
    ok: true,
    data,
    meta: { ...defaultMeta, ...meta },
    message,
    timestamp: new Date().toISOString(),
});

export const errorResponse = (
    message = "Internal server error"
): ApiResponse<null> => ({
    status: "error",
    ok: false,
    data: null,
    meta: defaultMeta,
    message,
    timestamp: new Date().toISOString(),
});

export const paginatedMeta = (
    total: number,
    page: number,
    limit: number,
    count: number
): Meta => ({
    count,
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
});