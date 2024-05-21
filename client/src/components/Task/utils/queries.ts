import { AxiosError } from "axios";
import { UseMutationResult, useMutation, useQuery } from "react-query";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import {
  ApiDataResponse,
  ApiGetTasksResponse,
  TaskParam,
  TaskRequestParam,
} from "~/components/Task/utils/type";

export const useGetTasks = () => {
  return useQuery<ApiGetTasksResponse, AxiosError>("getTasks", getTasks);
};

export const useAddTask = (): UseMutationResult<
  ApiDataResponse,
  AxiosError,
  TaskRequestParam
> => {
  return useMutation<ApiDataResponse, AxiosError, TaskRequestParam>(addTask);
};

export const useUpdateTask = () => {
  return useMutation<ApiDataResponse, AxiosError, TaskParam>(
    "updateTask",
    (params) => updateTask(params)
  );
};

export const useDeleteTask = () => {
  return useMutation<ApiDataResponse, AxiosError, TaskParam>(
    "deleteTask",
    (params) => deleteTask(params)
  );
};
