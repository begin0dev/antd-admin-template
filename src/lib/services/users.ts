import apiClient, { ApiBaseResponse } from "./apiClient";

const USERS_BASE_PATH = "users";

export interface UserInterface {
  id: number;
  email: string;
  gender: "men" | "women";
  createdAt: string;
  updatedAt: string;
}

export const getUsersApi = () =>
  apiClient.get<ApiBaseResponse<{ users: UserInterface[] }>>(`${USERS_BASE_PATH}`);
