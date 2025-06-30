declare type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

declare type ErrorResponse = {
  message: string | string[];
  error?: string;
  statusCode?: number;
};

declare type BaseModel = {
  _id: string;
};

declare type TimeStampModel = {
  createdAt: string;
  updatedAt: string;
};

declare type PaginationMeta = {
  pages: number;
  page: number;
  limit: number;
};

declare type PaginationResponse<T> = {
  meta: PaginationMeta;
  data: T[];
};

declare type Pagination = {
  page: number;
  limit: number;
};

declare type UsePaginationQueryResult<T> = {
  onChangePage: (page: number) => void;
} & PaginationMeta &
  import("@tanstack/react-query").UseQueryResult<PaginationResponse<T>, AxiosError<ErrorResponse>>;

declare type InfiniteResponse<T> = {
  nextCursor?: number;
  data: Array<T>;
};

declare type WeeklySalesData = {
  prevWeek: number[];
  currWeek: number[];
};

declare type AvatarSize = {
  width: number;
  height: number;
};
