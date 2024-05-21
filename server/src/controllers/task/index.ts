import { Response, Request } from "express";
import { TaskType } from "../../types/task";
import TaskModel from "../../models/task";
import UserModel from "../../models/user";
import { JwtPayload } from "jsonwebtoken";

interface DecodedUserType {
  id: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: DecodedUserType | JwtPayload;
}

const getTasks = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const id = req.user?.id ?? "";
    const tasks: TaskType[] = await TaskModel.find({ user: id });
    console.log("id", id);
    console.log("tasks", tasks);
    res.status(200).json({ tasks });
  } catch (error: any) {
    res.json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

const addTask = async (req: CustomRequest, res: Response): Promise<void> => {
  const body = req.body as Pick<
    TaskType,
    "name" | "description" | "status" | "user"
  >;
  try {
    const id = req.user?.id ?? "";
    const tasks: TaskType[] = await TaskModel.find({ id });
    const user = await UserModel.findById(id);
    console.log("user", user);
    const task: TaskType = new TaskModel({ ...body, user });

    await task.save();

    user?.tasks.push(task);
    await user?.save();

    res.status(201).json({ message: "Task added" });
  } catch (error: any) {
    res.json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    await TaskModel.findByIdAndUpdate({ _id: id }, body);

    res.status(200).json({
      message: "Task updated",
    });
  } catch (error: any) {
    res.json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Task deleted",
    });
  } catch (error: any) {
    res.json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

export { getTasks, addTask, updateTask, deleteTask };
