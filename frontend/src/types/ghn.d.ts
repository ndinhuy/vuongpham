declare type GhnResponse<T> = {
  code: number;
  data: T;
  message: string;
};

declare type GhnProvince = {
  ProvinceID: string;
  ProvinceName: string;
  CountryID: string;
  Code: string;
  NameExtension: string[];
  IsEnable: number;
  RegionID: string;
  RegionCPN: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  AreaID: string;
  CanUpdateCOD: boolean;
  Status: number;
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
};

declare type GhnDistrict = {
  DistrictID: string;
  ProvinceID: string;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  IsEnable: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  CanUpdateCOD: boolean;
  Status: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: {
    From: any[];
    To: any[];
    Return: any[];
  };
  WhiteListDistrict: {
    From: any | null;
    To: any | null;
  };
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: string[];
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
};

declare type GhnWard = {
  WardCode: string;
  DistrictID: string;
  WardName: string;
  NameExtension: string[];
  CanUpdateCOD: boolean;
  SupportType: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: {
    From: any[];
    To: any[];
    Return: any[];
  };
  WhiteListWard: {
    From: any | null;
    To: any | null;
  };
  Status: number;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: string | null;
  CreatedIP: string;
  CreatedEmployee: number;
  CreatedSource: string;
  CreatedDate: string;
  UpdatedEmployee: number;
  UpdatedDate: string;
};
