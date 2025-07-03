import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import _omitBy from "lodash/omitBy";

const axiosConfig = {
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
};

/** @class */
export default class HttpService {
  private readonly instance: AxiosInstance;

  constructor(config = axiosConfig) {
    const instance = axios.create({ ...config });
    Object.assign(instance, this.setupInterceptorsTo(instance));
    this.instance = instance;
    this.setHttpConfigs(config);
  }

  private readonly onRequest = (config: InternalAxiosRequestConfig) => {
    return config;
  };

  private readonly onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  private readonly onResponse = (response: AxiosResponse) => {
    return response;
  };

  private readonly _onResponseError = async (error: AxiosError): Promise<AxiosResponse> => {
    throw error;
  };

  public get onResponseError() {
    return this._onResponseError;
  }

  private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);
    return axiosInstance;
  }

  public async get<R>(url: string, config?: AxiosRequestConfig) {
    return await this.instance.get<R>(`${url}`, config);
  }

  public post<R, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.instance.post<R>(url, data, config);
  }

  public async put<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return await this.instance.put(url, data, config);
  }

  public async patch<R, D>(url: string, data: D, config?: AxiosRequestConfig) {
    return await this.instance.patch<R>(url, data, config);
  }

  public async delete(url: string, config?: AxiosRequestConfig) {
    return await this.instance.delete(url, config);
  }

  public setHttpConfigs(config?: Partial<AxiosRequestConfig>) {
    if (config?.baseURL) {
      this.instance.defaults.baseURL = config.baseURL;
    }

    Object.assign(this.instance.defaults, {
      ...this.instance.defaults,
      ..._omitBy(config ?? {}, "BaseURL"),
    });
  }
}

export const httpService = new HttpService();
