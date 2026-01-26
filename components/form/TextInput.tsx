"use client";

import { useRef, useEffect } from "react";

interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder = "",
  disabled = false,
}: TextInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={1}
      className="min-h-10 w-full resize-none overflow-hidden rounded border border-gray-200 bg-white px-3 py-2 text-body-md text-gray-800 placeholder:text-gray-300 focus:border-pink focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
    />
  );
}
