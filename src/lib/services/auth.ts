import apiClient, { ApiBaseResponse } from "./apiClient";
import { UserInterface } from "../../stores/user";

const AUTH_BASE_PATH = "auth";

export interface LoginApiParamsInterface {
  username: string;
  password: string;
}
export const loginApi = (params: LoginApiParamsInterface) =>
  apiClient.post<ApiBaseResponse<{ token: string; user: UserInterface }>>(
    `${AUTH_BASE_PATH}/login`,
    params,
  );

export const signUpApi = (params: LoginApiParamsInterface) =>
  apiClient.post<ApiBaseResponse<{ token: string }>>(`${AUTH_BASE_PATH}/signup`, params);
