import { Document } from "mongoose";

interface UserTask extends Document {
  name: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
}

export interface UserType extends Document {
  email: string;
  password: string;
  status: boolean;
  tasks: UserTask[];
}
