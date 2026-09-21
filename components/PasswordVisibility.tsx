"use client";
import Image from "next/image";

interface PasswordToggleProps {
    showPassword: boolean;
    className?: string;
}

export default function PasswordVisibility ({showPassword, className}: PasswordToggleProps) {
    return showPassword ? (
        <Image
            src="/image/hide.svg"
            alt="hide password"
            width={15}
            height={15}
            className={className}
        >                                
        </Image>
    ): (
        <Image
            src="/image/view.svg"
            alt="view password"
            width={15}
            height={15}
            className={className}
        >                                
        </Image>
    )
}