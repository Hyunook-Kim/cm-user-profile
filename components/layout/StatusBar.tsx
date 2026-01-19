import Image from "next/image";

export default function StatusBar() {
  return (
    <div className="sticky top-0 z-20 flex h-[52px] items-center justify-between rounded-t-[28px] bg-white px-6 py-[10px]">
      <span className="font-sans text-[14px] font-medium leading-5 tracking-[0.01em] text-[#1D1B20]">
        9:30
      </span>

      <div className="flex h-[17px] w-[46px] items-center gap-[2px]">
        <Image
          src="/icons/status-bar/Wifi.svg"
          alt="Wifi"
          width={17}
          height={17}
        />

        <Image
          src="/icons/status-bar/Signal.svg"
          alt="Signal"
          width={17}
          height={17}
        />

        <Image
          src="/icons/status-bar/Battery.svg"
          alt="Battery"
          width={8}
          height={15}
        />
      </div>
    </div>
  );
}
