import React, { useState, useEffect, ChangeEvent } from "react";
//import { RouteComponentProps } from 'react-router-dom';
import TaskDataService from "../services/TaskService";
import Task from "../types/Task";
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
//type Props = RouteComponentProps<RouterProps>;
const TaskDetail: React.FC<any> = (props: any) => {
  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTask, setCurrentTask] = useState<Task>(initialTaskState);
  const [message, setMessage] = useState<string>("");
  const getTask = (id: string) => {
    TaskDataService.get(id)
      .then((response: any) => {
        setCurrentTask(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTask(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setCurrentTask({ ...currentTask, [name]: value });
  };
  const updatePublished = (status: boolean) => {
    var data = {
      id: currentTask.id,
      description: currentTask.description,
      done: status
    };
    TaskDataService.update(currentTask.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentTask({ ...currentTask, done: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const updateTask = () => {
    TaskDataService.update(currentTask.id, currentTask)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The task was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteTask = () => {
    TaskDataService.remove(currentTask.id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/tasks");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTask.done ? "Done" : "Pending"}
            </div>
          </form>
          {currentTask.done ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <button className="badge badge-danger mr-2" onClick={deleteTask}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTask}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Task...</p>
        </div>
      )}
    </div>
  );
};
export default TaskDetail;