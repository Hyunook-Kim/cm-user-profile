"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";
import {
  cityOptions,
  getDistrictsByCity,
  getDongsByDistrict,
} from "@/constants/locationData";

type LocationFieldPrefix = "residence" | "church";

interface LocationSelectorProps {
  /** 필드명 접두사 (예: "residence" → residenceType, residenceCity 등) */
  fieldPrefix: LocationFieldPrefix;
}

type LocationTypeField = `${LocationFieldPrefix}Type`;
type CityField = `${LocationFieldPrefix}City`;
type DistrictField = `${LocationFieldPrefix}District`;
type DongField = `${LocationFieldPrefix}Dong`;
type OverseasField = `${LocationFieldPrefix}Overseas`;

export default function LocationSelector({
  fieldPrefix,
}: LocationSelectorProps) {
  const { watch, setValue } = useFormContext();

  // 필드명 생성
  const typeField = `${fieldPrefix}Type` as LocationTypeField;
  const cityField = `${fieldPrefix}City` as CityField;
  const districtField = `${fieldPrefix}District` as DistrictField;
  const dongField = `${fieldPrefix}Dong` as DongField;
  const overseasField = `${fieldPrefix}Overseas` as OverseasField;

  // 폼 값 구독
  const locationType = watch(typeField) as "domestic" | "overseas";
  const city = (watch(cityField) as string) || "";
  const district = (watch(districtField) as string) || "";
  const dong = (watch(dongField) as string) || "";
  const overseas = (watch(overseasField) as string) || "";

  // 동적 옵션 계산
  const districtOptions = city ? getDistrictsByCity(city) : [];
  const dongOptions = district ? getDongsByDistrict(district) : [];

  // 핸들러
  const handleLocationTypeChange = (type: "domestic" | "overseas") => {
    setValue(typeField, type);
  };

  const handleCityChange = (value: string) => {
    setValue(cityField, value);
    setValue(districtField, "");
    setValue(dongField, "");
  };

  const handleDistrictChange = (value: string) => {
    setValue(districtField, value);
    setValue(dongField, "");
  };

  const handleDongChange = (value: string) => {
    setValue(dongField, value);
  };

  const handleOverseasChange = (value: string) => {
    setValue(overseasField, value);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 국내 Row */}
      <div className="flex items-start gap-3">
        <label className="flex shrink-0 cursor-pointer items-center gap-1 py-1">
          <input
            type="radio"
            value="domestic"
            checked={locationType === "domestic"}
            onChange={() => handleLocationTypeChange("domestic")}
            className="sr-only"
          />
          <Image
            src={
              locationType === "domestic"
                ? "/icons/radio/radio-on.svg"
                : "/icons/radio/radio-off.svg"
            }
            alt=""
            width={20}
            height={20}
          />
          <span className="text-[14px] font-light leading-[24px] text-gray-800">
            국내
          </span>
        </label>
        <div className="flex flex-1 flex-wrap gap-2">
          <div className="w-[120px] flex-1">
            {/* <div className="w-[120px]"> */}
            <Dropdown
              options={cityOptions}
              placeholder="시/도"
              value={city}
              onChange={handleCityChange}
            />
          </div>
          <div className="w-[100px] flex-1">
            {/* <div className="w-[100px]"> */}
            <Dropdown
              options={districtOptions}
              placeholder="구/군"
              value={district}
              onChange={handleDistrictChange}
            />
          </div>
          <div className="w-full">
            <Dropdown
              options={dongOptions}
              placeholder="동/읍/면"
              value={dong}
              onChange={handleDongChange}
            />
          </div>
        </div>
      </div>

      {/* 해외 Row */}
      <div className="flex items-start gap-3">
        <label className="flex shrink-0 cursor-pointer items-center gap-1 py-1">
          <input
            type="radio"
            value="overseas"
            checked={locationType === "overseas"}
            onChange={() => handleLocationTypeChange("overseas")}
            className="sr-only"
          />
          <Image
            src={
              locationType === "overseas"
                ? "/icons/radio/radio-on.svg"
                : "/icons/radio/radio-off.svg"
            }
            alt=""
            width={20}
            height={20}
          />
          <span className="text-[14px] font-light leading-[24px] text-gray-800">
            해외
          </span>
        </label>
        <div className="flex-1">
          <TextInput
            placeholder=""
            disabled={locationType !== "overseas"}
            value={overseas}
            onChange={handleOverseasChange}
          />
        </div>
      </div>
    </div>
  );
}
