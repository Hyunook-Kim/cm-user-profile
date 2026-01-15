interface CardProps {
  children: React.ReactNode;
  label: string;
  helpIcon?: React.ReactNode;
}

export default function Card({ children, label, helpIcon }: CardProps) {
  return (
    <div className="flex flex-col gap-3 self-stretch rounded-lg border border-gray-100 bg-white px-6 py-5">
      <div className="flex items-center gap-1">
        <span className="text-[16px] font-medium leading-[20px] text-black">
          {label}
        </span>
        {helpIcon}
      </div>

      {children}
    </div>
  );
}
