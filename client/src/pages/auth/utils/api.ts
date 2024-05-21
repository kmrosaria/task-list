import axios from "axios";
import { UserRequestParam, UserResponse } from "./type";

const baseUrl: string = "http://localhost:4081";

export const login = async (param: UserRequestParam): Promise<UserResponse> => {
  const { email, password } = param;
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  param: UserRequestParam
): Promise<UserResponse> => {
  const { email, password } = param;
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
