"use client";
import OtpInput from "@/components/OtpInput";
import { VerifyEmailRequest, TokenResponse } from "@/app/types/auth.types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import apiClient from "@/lib/api/apiClient";
import { SuccessResponse, ErrorResponse } from "@/app/types";
import axios from "axios";
import Link from "next/link";

export default function AuthenticationPage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState<string>("");
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const viewErrorMessage = (err: string) => {
        setMessage(err);
        setShowErrorMessage(true);
        setTimeout(() => {
        setMessage("");
        setShowErrorMessage(false);
        }, 5000)
    }
    
    const handleSubmit = async (code: string) => {
        const email = searchParams.get("email")
        if (!email) return;
        console.log(code);

        const payload: VerifyEmailRequest = {
            emailAddress: email,
            verificationCode: code,
        };

        try {
            const response = await apiClient.post<SuccessResponse<TokenResponse>>("/api/auth/verify-email", payload)
            // Store tokens
            const { data } = response.data;
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            
            console.log(response);
            router.push("/");

        } catch (err) {
            if (axios.isAxiosError(err)){
                const errorData: ErrorResponse = err.response?.data;
                console.log(errorData);
                viewErrorMessage(errorData.details);
            }  else {
                viewErrorMessage("an unexpected error occured");
            }
        }
    }

    return (
        <form method="post" className="w-full space-y-4">
            { showErrorMessage &&
                <div className="flex items-start sm:items-center p-4 mb-4 text-sm text-black rounded-base bg-red-500" role="alert">
                    <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    <p className="capitalize"> {message} </p>
                </div>
            }
            <div className="space-y-4">
                <div className="space-y-4">
                    <h1 className="font-black text-4xl font-playfair">
                        Verify your email
                    </h1>
                    <p className="font-sans">
                        Your 6-digit code was sent to you via email
                    </p>
                </div>
                <OtpInput length={6} onComplete={handleSubmit} />
            </div>
            <div>
                <p>
                    Go back to registration? <Link href="/auth/signup" className="italic text-blue-300"> click here </Link>
                </p>
            </div>
        </form>
    )
}