import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { GHN_ADDRESS_BASE_URL, GHN_TOKEN_API } from "@app/constants";

const ghnAxiosInstance: AxiosInstance = axios.create({
  baseURL: GHN_ADDRESS_BASE_URL,
  headers: {
    token: GHN_TOKEN_API,
  },
});

export const useQueryProvinces = (): UseQueryResult<GhnProvince[], AxiosError> => {
  return useQuery<GhnProvince[], AxiosError, any>({
    queryKey: ["provinces"],
    queryFn: async (): Promise<GhnProvince[]> => {
      const response: AxiosResponse<GhnResponse<GhnProvince[]>> = await ghnAxiosInstance.get("/province");

      return response.data.data;
    },
    staleTime: Infinity,
  });
};

export const useQueryDistricts = (provinceId?: string): UseQueryResult<GhnDistrict[], AxiosError> => {
  return useQuery<GhnDistrict[], AxiosError>({
    queryKey: ["districts", provinceId],
    queryFn: async (): Promise<GhnDistrict[]> => {
      const response: AxiosResponse<GhnResponse<GhnDistrict[]>> = await ghnAxiosInstance.get("/district", {
        params: {
          province_id: provinceId,
        },
      });

      return response.data.data;
    },
    enabled: !!provinceId,
    staleTime: Infinity,
  });
};

export const useQueryWards = (districtId?: string): UseQueryResult<GhnWard[], AxiosError> => {
  return useQuery<GhnWard[], AxiosError>({
    queryKey: ["wards", districtId],
    queryFn: async (): Promise<GhnWard[]> => {
      const response: AxiosResponse<GhnResponse<GhnWard[]>> = await ghnAxiosInstance.get("/ward", {
        params: {
          district_id: districtId,
        },
      });

      return response.data.data;
    },
    enabled: !!districtId,
    staleTime: Infinity,
  });
};
