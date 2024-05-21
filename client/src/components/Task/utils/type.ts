export interface TaskType {
  _id: string;
  name: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskProps {
  task: TaskType;
}

export type ApiDataResponse = {
  message: string;
  status: string;
};

export interface ApiGetTasksResponse {
  tasks: TaskType[];
}

export interface TaskRequestParam {
  _id?: string;
  name: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskParam {
  id: string;
  status?: string;
  name?: string;
  description?: string;
}
