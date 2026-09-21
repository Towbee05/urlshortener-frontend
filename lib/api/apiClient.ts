import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { StatusCodes } from "http-status-codes";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

interface RefreshResponse {
    accessToken: string
}

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    withCredentials: true,
});

let refreshPromise : Promise<string> | null = null;

const getNewAccessToken = async () => {
    if (!refreshPromise) {
        refreshPromise = apiClient.post<RefreshResponse>(`/api/auth/refresh-token`, {  }, { withCredentials: true })
        .then(( {data} ) => {
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        })
        .finally(() => { refreshPromise = null });
    }
    return refreshPromise;
}

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response, 
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig;
        if (error.response?.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const accessToken = await getNewAccessToken();
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                const refreshError = err as AxiosError;
                const status = refreshError.response?.status;

                if (status === StatusCodes.UNAUTHORIZED || status === StatusCodes.FORBIDDEN) {
                    localStorage.removeItem('accessToken');
                    window.location.href = "/auth/login";
                }
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;