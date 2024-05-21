import { TaskType } from "~/components/Task/utils/type";

export interface UserRequestParam {
  email: string;
  password: string;
}

export interface UserResponse {
  status: number;
  success: boolean;
  message: string;
  token: string;
  user?: UserType;
}

export interface UserErrorResponse {
  status: number;
  message: string;
  success: boolean;
}

interface UserType {
  status: boolean;
  todos?: TaskType[];
  _id?: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}
