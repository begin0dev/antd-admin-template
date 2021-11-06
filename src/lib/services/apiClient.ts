import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { message as Message } from "antd";

import { StorageManager } from "../managers/storageManager";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "/api",
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};
  const storageManager = new StorageManager();
  const apiToken = storageManager.apiToken;
  if (apiToken) config.headers["Authorization"] = `Bearer ${apiToken}`;
  return config;
});

export default apiClient;

export type ApiBaseResponse<D> = {
  status: string;
  message?: string;
  data: D;
};

function isAxiosError(err: Error | AxiosError | unknown): err is AxiosError<ApiBaseResponse<any>> {
  return (err as AxiosError).isAxiosError;
}

export const errorHandler = (
  err: unknown | Error | AxiosError<ApiBaseResponse<any>>,
  withMessage?: boolean,
) => {
  withMessage = withMessage ?? true;
  if (process.env.NODE_ENV !== "production") console.error(err);

  let message: string = (err as Error | AxiosError<ApiBaseResponse<any>>)?.message;
  if (isAxiosError(err) && err.response) {
    const { response } = err;
    message = response.data?.message || response.statusText;
  }

  if (withMessage) Message.error(message);
  return message;
};

export const apiDataGetter = <D>(res: AxiosResponse<ApiBaseResponse<D>>) => res.data.data;
