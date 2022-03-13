import React, { useState, ChangeEvent } from "react";
import TaskDataService from "../services/TaskService";
import Task from '../types/Task';
const AddTask: React.FC = () => {
  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [task, setTask] = useState<Task>(initialTaskState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };
  const saveTask = () => {
    var data = {
      description: task.description
    };
    TaskDataService.create(data)
      .then((response: any) => {
        setTask({
          id: response.data.id,
          description: response.data.description,
          done: response.data.done
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={task.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddTask;