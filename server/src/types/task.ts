import { Document } from "mongoose";

export interface TaskType extends Document {
  name: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  user: string;
}
