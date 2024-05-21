import { TaskType } from "../types/task";
import { model, Schema } from "mongoose";

const taskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "todo",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User", // give reference to the user model
    },
  },
  { timestamps: true }
);

export default model<TaskType>("Task", taskSchema);
