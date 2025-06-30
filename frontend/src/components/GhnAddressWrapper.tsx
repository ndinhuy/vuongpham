"use client";

import { FC, memo, ReactElement, ReactNode, useEffect, useState } from "react";
import { useQueryProvinces, useQueryDistricts, useQueryWards } from "@app/data";

type ChildrenFuncParams = {
  provinces: GhnProvince[];
  districts: GhnDistrict[];
  wards: GhnWard[];
  isProvincesLoading: boolean;
  isDistrictsLoading: boolean;
  isWardsLoading: boolean;
  onSelectProvince: (province: GhnProvince) => void;
  onSelectDistrict: (district: GhnDistrict) => void;
  onSelectWard: (ward: GhnWard) => void;
  selectedProvince: GhnProvince | null;
  selectedDistrict: GhnDistrict | null;
  selectedWard: GhnWard | null;
};

type InitialSelectedValues = {
  provinceId?: string;
  districtId?: string;
  wardId: string;
};

type GhnAddressWrapperProps = {
  children: (params: ChildrenFuncParams) => ReactNode | ReactElement;
  initialSelectedValues?: InitialSelectedValues;
  onSelectedProvinceChange?: (province: GhnProvince) => void;
  onSelectedDistrictChange?: (district: GhnDistrict) => void;
  onSelectedWardChange?: (ward: GhnWard) => void;
};

const GhnAddressWrapper: FC<GhnAddressWrapperProps> = ({
  children,
  initialSelectedValues,
  onSelectedProvinceChange,
  onSelectedDistrictChange,
  onSelectedWardChange,
}: GhnAddressWrapperProps) => {
  const [selectedProvince, setSelectedProvince] = useState<GhnProvince | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<GhnDistrict | null>(null);
  const [selectedWard, setSelectedWard] = useState<GhnWard | null>(null);

  const { data: provinces = [], isLoading: isProvincesLoading } = useQueryProvinces();
  const { data: districts = [], isLoading: isDistrictsLoading } = useQueryDistricts(selectedProvince?.ProvinceID);
  const { data: wards = [], isLoading: isWardsLoading } = useQueryWards(selectedDistrict?.DistrictID);

  useEffect(() => {
    if (!initialSelectedValues) return;

    const { provinceId, districtId, wardId } = initialSelectedValues;

    if (!selectedProvince && provinceId) {
      const province = provinces.find((province) => province.ProvinceID == provinceId);
      if (province) {
        onSelectedProvinceChange?.(province);
        setSelectedProvince(province);
      }
    }

    if (!selectedDistrict && districtId) {
      const district = districts.find((district) => district.DistrictID == districtId);
      if (district) {
        onSelectedDistrictChange?.(district);
        setSelectedDistrict(district);
      }
    }

    if (!selectedWard && wardId) {
      const ward = wards.find((ward) => ward.WardCode == wardId);
      if (ward) {
        onSelectedWardChange?.(ward);
        setSelectedWard(ward);
      }
    }
  }, [initialSelectedValues, provinces, districts, wards, selectedProvince, selectedDistrict, selectedWard]);

  const onSelectProvince = (province: GhnProvince) => {
    onSelectedProvinceChange?.(province);
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const onSelectDistrict = (district: GhnDistrict) => {
    setSelectedDistrict(district);
    onSelectedDistrictChange?.(district);
    setSelectedWard(null);
  };

  const onSelectWard = (ward: GhnWard) => {
    onSelectedWardChange?.(ward);
    setSelectedWard(ward);
  };

  return children({
    provinces,
    districts,
    wards,
    isProvincesLoading,
    isDistrictsLoading,
    isWardsLoading,
    onSelectProvince,
    onSelectDistrict,
    onSelectWard,
    selectedProvince,
    selectedDistrict,
    selectedWard,
  });
};

export default memo(GhnAddressWrapper);
