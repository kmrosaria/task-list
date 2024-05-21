import axios from "axios";
import {
  ApiDataResponse,
  ApiGetTasksResponse,
  TaskParam,
  TaskRequestParam,
} from "./type";

const baseUrl: string = "http://localhost:4081";
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export const getTasks = async (): Promise<ApiGetTasksResponse> => {
  const res = await axios.get<ApiGetTasksResponse>(`${baseUrl}/tasks/`, config);
  return res.data;
};

export const addTask = async (
  param: TaskRequestParam
): Promise<ApiDataResponse> => {
  const { name, description } = param;

  try {
    const response = await axios.post(
      `${baseUrl}/task/new`,
      {
        name,
        description,
      },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (
  param: TaskParam
): Promise<ApiDataResponse> => {
  try {
    const response = await axios.put(
      `${baseUrl}/task/${param.id}`,
      {
        status: param.status,
      },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (
  param: TaskParam
): Promise<ApiDataResponse> => {
  try {
    const response = await axios.delete(`${baseUrl}/task/${param.id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
