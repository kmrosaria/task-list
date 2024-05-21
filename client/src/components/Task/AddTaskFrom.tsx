import { Field } from "formik";
import { ReactElement, useState, FormEvent } from "react";
import { TaskType } from "~/components/Task/utils/type";

type Props = {
  saveTask: (e: FormEvent, formData: TaskType | any) => void;
};

interface FormDataType {
  name: string;
  description: string;
}

const AddTaskFrom = (props: Props): ReactElement => {
  const { saveTask } = props;
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
  });

  const handleForm = (e: FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    saveTask(e, formData);

    //clear form
    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <form className="form p-3" onSubmit={(e) => handleSave(e)}>
      <div className="row">
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              name="name"
              className={"form-control"}
              id="name"
              value={formData.name}
              onChange={handleForm}
            />
            <label htmlFor="name">Task</label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              name="description"
              className={"form-control"}
              id="description"
              value={formData.description}
              onChange={handleForm}
            />
            <label htmlFor="name">Description</label>
          </div>
        </div>
      </div>

      <button
        className="btn btn-secondary w-100"
        disabled={formData === undefined ? true : false}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskFrom;
