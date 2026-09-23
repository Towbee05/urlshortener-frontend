"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authRegisterSchema, AuthRegisterSchema } from "@/lib/schemas/auth";
import { SuccessResponse, ErrorResponse } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import PasswordVisibility from "@/components/PasswordVisibility";
import apiClient from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function AuthenticationPage(){
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    }; 

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthRegisterSchema>(
        {
            resolver: zodResolver(authRegisterSchema),
            defaultValues: {
                username: "",
                email: "",
                password: "",
            }
        }
    );

    const viewErrorMessage = (err: string) => {
        setMessage(err);
        setShowErrorMessage(true);
        setTimeout(() => {
        setMessage("");
        setShowErrorMessage(false);
        }, 5000)
    }

    const onSubmit: SubmitHandler<AuthRegisterSchema> = async (data) => {
        const { username, email, password } = data;
        const payload: AuthRegisterSchema = {
            email,
            username,
            password
        };
        try {
            const response = await apiClient.post<SuccessResponse<string>>("/api/auth/register", payload);
            console.log("jixxxx!!!");
            console.log(response);
            router.push(`/auth/verify-email?email=${email}`);
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
        <form method="post" className="w-full" onSubmit={handleSubmit(onSubmit)}>
            { showErrorMessage &&
                <div className="flex items-start sm:items-center p-4 mb-4 text-sm text-black rounded-base bg-red-500" role="alert">
                    <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    <p className="capitalize"> {message} </p>
                </div>
            }
            <div className="space-y-4">
                <div className="space-y-4">
                    <h1 className="font-black text-4xl font-playfair">
                        Create an account
                    </h1>
                    <p className="font-sans">
                        Get a neatly shortened url in seconds. &nbsp;
                    </p>
                    <p>
                        Already have an account? <Link href="/auth/login" className="italic text-[#0000FF] underline focus:cursor-pointer"> Login now </Link>
                    </p>
                </div>
                <div>
                    <div className="flex flex-col gap-1 pb-3">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" id="email" className={`border h-10 px-2 py-1 rounded-md focus:border-2 border-black ${errors.email ? "focus:outline-red-500 border-red-500" : "focus:outline-blue-500 border-black"}`} {...register("email")} required/>
                        { errors.email && 
                            <p className="text-xs text-red-500 mt-2">
                                { errors.email.message }
                            </p>
                        }
                    </div>
                    <div className="flex flex-col gap-1 pb-3">
                        <label htmlFor="username">
                            Username
                        </label>
                        <input type="text" id="username" className={`border h-10 px-2 py-1 rounded-md focus:border-2 border-black ${errors.username ? "focus:outline-red-500 border-red-500" : "focus:outline-blue-500 border-black"}`} {...register("username")} required/>
                        { errors.username &&
                            <p className="text-xs text-red-500 mt-2">
                                { errors.username.message }
                            </p>
                        }
                    </div>
                    <div className="flex flex-col gap-1 pb-3">
                        <label htmlFor="password">
                            Password
                        </label>
                        <div className="w-full flex items-center relative">
                            <input type={showPassword ? "text" : "password"} id="password" className={`border h-10 px-2 py-1 rounded-md focus:border-2 w-full border-black ${errors.password ? "focus:outline-red-500 border-red-500" : "focus:outline-blue-500 border-black"}`} {...register("password")} required/>
                            <button type="button" className="absolute left-[calc(100%-32px)] h-8 w-8 flex items-center justify-center" onClick={(e) => toggleShowPassword(e)}>
                                <PasswordVisibility className="cursor-pointer" showPassword={showPassword} />
                            </button>
                        </div>
                        { errors.password &&
                            <p className="text-xs text-red-500 mt-2">
                                { errors.password.message }
                            </p>
                        }
                    </div>

                    <div className="flex justify-center items-center gap-5">
                        <div className="w-full h-px bg-black"></div>
                        <p> or </p>
                        <div className="w-full h-px bg-black"></div>
                    </div>

                    <div className="space-y-3 mt-5">
                        <button className="border border-black flex items-center justify-center py-2 gap-3 w-full cursor-pointer" type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
                            <Image 
                                src="/image/google.svg"
                                alt="google logo"
                                width={16}
                                height={16}
                            ></Image>
                            <p>
                                Sign up with Google
                            </p>
                        </button>
                        <button className="border border-black flex items-center justify-center py-2 gap-3 w-full cursor-pointer" type="button" onClick={() => signIn("github", { callbackUrl: "/" })}>
                            <Image 
                                src="/image/github.svg"
                                alt="github logo"
                                width={16}
                                height={16}
                            ></Image>
                            <p>
                                Sign up with Github
                            </p>
                        </button>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full text-center bg-[#6082B6] py-2 rounded-md cursor-pointer" disabled={isSubmitting}>
                        {
                            isSubmitting ? "Submitting..." : "Create account"
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}