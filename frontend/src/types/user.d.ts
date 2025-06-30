declare type Gender = "Nam" | "Nữ" | "Khác";

declare type Role = "CUSTOMER" | "ADMIN" | "OWNER";

declare type User = BaseModel & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string[];
  addressCode: string[];
  birth: string;
  gender: Gender;
  role: Role;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
};

declare type AccessRecord = BaseModel &
  TimeStampModel & {
    user: User | string;
    deviceInfo: string;
    browserInfo: string;
    ipAddress: string;
  };

declare type UpdateUserRequest = Partial<User>;
