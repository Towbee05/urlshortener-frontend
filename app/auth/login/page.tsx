"use client";
import Image from "next/image";
import React, { useState } from "react";
import PasswordVisibility from "@/components/PasswordVisibility";
import Link from "next/link";

export default function AuthenticationPage(){
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };

    return (
        <form method="post">
            <div className="space-y-4">
                <div className="space-y-4">
                    <h1 className="font-black text-4xl font-playfair">
                        Welcome back
                    </h1>
                    <p>
                        New to urlshortener? <Link href="/auth/signup" className="italic text-[#0000FF] underline focus:cursor-pointer"> register here </Link>
                    </p>
                    <p className="font-sans">
                        Login to existing account
                    </p>
                </div>
                <div>
                    <div className="flex flex-col gap-1 pb-3">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" className="border h-10 px-2 py-1 rounded-md focus:border-2 focus:ring-[#0000FF] focus:border-[#0000FF]" required/>
                    </div>
                    <div className="flex flex-col gap-1 pb-3">
                        <label htmlFor="password">
                            Password
                        </label>
                        <div className="w-full flex items-center relative">
                            <input type={showPassword ? "text" : "password"} name="password" id="password" className="border h-10 px-2 py-1 rounded-md focus:border-2 focus:ring-[#0000FF] focus:border-[#0000FF] w-full" required/>
                            <button type="button" className="absolute left-[calc(100%-32px)] h-8 w-8 flex items-center justify-center" onClick={(e) => toggleShowPassword(e)}>
                                <PasswordVisibility className="cursor-pointer" showPassword={showPassword} />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                        <div className="w-full h-px bg-black"></div>
                        <p> or </p>
                        <div className="w-full h-px bg-black"></div>
                    </div>

                    <div className="space-y-3 mt-5">
                        <button className="border border-black flex items-center justify-center py-2 gap-3 w-full cursor-pointer" type="button">
                            <Image 
                                src="/image/google.svg"
                                alt="google logo"
                                width={16}
                                height={16}
                            ></Image>
                            <p>
                                Sign in with Google
                            </p>
                        </button>
                        <button className="border border-black flex items-center justify-center py-2 gap-3 w-full cursor-pointer" type="button">
                            <Image 
                                src="/image/github.svg"
                                alt="github logo"
                                width={16}
                                height={16}
                            ></Image>
                            <p>
                                Sign in with Github
                            </p>
                        </button>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full text-center bg-[#6082B6] py-2 rounded-md cursor-pointer">
                        Login
                    </button>
                </div>
            </div>
        </form>
    )
}