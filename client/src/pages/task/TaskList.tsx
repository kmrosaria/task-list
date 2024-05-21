import { FormEvent, ReactElement } from "react";
import TaskItem from "../../components/Task/TaskItem";
import { TaskType } from "../../components/Task/utils/type";
import {
  useAddTask,
  useUpdateTask,
  useDeleteTask,
  useGetTasks,
} from "../../components/Task/utils/queries";
import AddTaskFrom from "../../components/Task/AddTaskFrom";

const TaskList = (): ReactElement => {
  const { data, refetch } = useGetTasks();

  const AddTask = useAddTask();
  const UpdateTask = useUpdateTask();
  const DeleteTask = useDeleteTask();

  const handleSaveTask = (e: FormEvent, formData: TaskType): void => {
    e.preventDefault();

    AddTask.mutate(formData, {
      onSuccess: (data) => {
        console.log("data", data);
        refetch();
      },
      onError: (error) => {
        alert(error.message);
        console.log(error);
      },
    });
  };

  const handleUpdateTask = (_id: string, status: string): void => {
    UpdateTask.mutate(
      { id: _id, status },
      {
        onSuccess: (data) => {
          console.log("data", data);
          refetch();
        },
        onError: (error) => {
          alert(error.message);
          console.log(error);
        },
      }
    );
  };

  const handleDeleteTask = (_id: string): void => {
    DeleteTask.mutate(
      { id: _id },
      {
        onSuccess: (data) => {
          console.log("data", data);
          refetch();
        },
        onError: (error) => {
          alert(error.message);
          console.log(error);
        },
      }
    );
  };

  return (
    <div
      className="d-flex p-5 justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="task-list-container">
        <h3 className="h3 mb-3 fw-normal">My Tasks</h3>
        <AddTaskFrom saveTask={handleSaveTask} />
        <div className="list" style={{ maxHeight: "525px", overflowY: "auto" }}>
          {data?.tasks.map((task: TaskType) => (
            <TaskItem
              key={task._id}
              updateTask={handleUpdateTask}
              deleteTask={handleDeleteTask}
              task={task}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
