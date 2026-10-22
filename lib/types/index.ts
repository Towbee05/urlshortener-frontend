export interface SuccessResponse<T> { 
    status: string;
    data: T;
}

export interface ErrorResponse{
    status: string;
    details: string;
}