"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;
  const isPlaceholder = !selectedOption;

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-full items-center justify-between rounded border bg-white px-3 py-2 text-left ${
          isOpen ? "border-pink" : "border-gray-200"
        }`}
      >
        <span
          className={`whitespace-nowrap text-[14px] font-light leading-[20px] ${
            isPlaceholder ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {displayText}
        </span>
        <Image
          src="/icons/basic/arrow-down-s-line.svg"
          alt=""
          width={20}
          height={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* 드롭다운 팝업 */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center px-3 py-2 text-left text-[14px] font-light leading-[20px] hover:bg-gray-50 ${
                  option.value === value
                    ? "bg-pink-50 text-pink"
                    : "text-gray-800"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
