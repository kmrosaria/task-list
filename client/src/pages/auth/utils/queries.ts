import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { login, register } from "./api";
import { UserRequestParam, UserResponse } from "./type";

export const useAuthLogin = (): UseMutationResult<
  UserResponse,
  AxiosError,
  UserRequestParam
> => {
  return useMutation<UserResponse, AxiosError, UserRequestParam>(login);
};

export const useAuthRegister = (): UseMutationResult<
  UserResponse,
  AxiosError,
  UserRequestParam
> => {
  return useMutation<UserResponse, AxiosError, UserRequestParam>(register);
};
