export interface VerifyEmailRequest {
    emailAddress: string;
    verificationCode: string;
}

export interface TokenResponse {
    accessToken: string;
}
