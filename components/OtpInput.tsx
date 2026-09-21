// components/OtpInput.tsx
"use client";
import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, rawValue: string) => {
    // only allow a single digit
    const digit = rawValue.replace(/\D/g, "").slice(-1);

    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    if (newValues.every((v) => v !== "")) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const newValues = Array(length).fill("");
    pasted.split("").forEach((char, i) => {
      newValues[i] = char;
    });
    setValues(newValues);

    const nextEmptyIndex = newValues.findIndex((v) => v === "");
    focusInput(nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex);

    if (newValues.every((v) => v !== "")) {
      onComplete(newValues.join(""));
    }
  };

  return (
    <div className="flex gap-2">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-2xl border rounded-md focus:border-2 focus:border-[#0000FF] focus:ring-[#0000FF] outline-none"
        />
      ))}
    </div>
  );
}