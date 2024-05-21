import { ReactElement } from "react";
import { TaskProps } from "~/components/Task/utils/type";
import { FaTrashCan } from "react-icons/fa6";

type Props = TaskProps & {
  updateTask: (_id: string, status: string) => void;
  deleteTask: (_id: string) => void;
};

const Task = (props: Props): ReactElement => {
  const { task, updateTask, deleteTask } = props;
  const checkTask: string = task.status === "completed" ? `line-through` : "";

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center justify-content-between">
          <span>{task.name}</span>
          <button
            type="button"
            onClick={() => deleteTask(task._id)}
            className="btn btn-warning"
          >
            <FaTrashCan />
          </button>
        </h5>
        <p className="card-text">{task.description}</p>
        <div
          className="btn-group d-flex "
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className={
              "btn btn-secondary " + (task.status === "todo" && "active")
            }
            onClick={() => updateTask(task._id, "todo")}
          >
            Todo
          </button>
          <button
            type="button"
            className={
              "btn btn-primary " + (task.status === "in-progress" && "active")
            }
            onClick={() => updateTask(task._id, "in-progress")}
          >
            In Progress
          </button>
          <button
            type="button"
            className={
              "btn btn-success " + (task.status === "completed" && "active")
            }
            onClick={() => updateTask(task._id, "completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
