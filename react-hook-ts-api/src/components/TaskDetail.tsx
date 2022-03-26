import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskDataService from "../services/TaskService";
import Task from "../types/Task";
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
//type Props = RouteComponentProps<RouterProps>;
const TaskDetail: React.FC<any> = (props) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const initialTaskState = {
    id: null,
    description: "",
    done: false
  };
  const [currentTask, setCurrentTask] = useState<Task>(initialTaskState);
  const [message, setMessage] = useState<string>("");
  const getTask = (id: string) => {
    TaskDataService.get(id)
      .then((response: any) => {
        console.log("Before setting: ", currentTask, response.data.task)
        setCurrentTask(response.data.task);
        console.log("After setting: ", currentTask, response.data.task)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    console.log("SO???", id)
    getTask(`${id}`);
  }, [id]);
  const handleInputChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    console.log(">Change handler: ", name, value)
    setCurrentTask({ ...currentTask, [name]: value });
  };
  const handleRadioChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    console.log(">Change handler for radio: ", name, value)
    setCurrentTask({ ...currentTask, [name]: (value === 'true') });
  };
  const updateTask = () => {
    console.log(">About to send from react: ", currentTask)
    TaskDataService.update(currentTask.id, currentTask)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The task was updated successfully!");
        navigate("/tasks");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const deleteTask = () => {
    console.log("About to remove: ", currentTask.id)
    TaskDataService.remove(currentTask.id)
      .then((response: any) => {
        console.log(response.data.task);
        navigate("/tasks");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task: {currentTask.done ? "Done" : "Pending"}</h4>
          <form>
            <div className="form-group">
              <label htmlFor="description">Description </label>
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
              <label htmlFor="status_pending">Pending</label>
              <input type="radio"
                id="status_pending" 
                name="done"
                onChange={handleRadioChange}
                value="false"
                checked={!currentTask.done}
              />
              <label htmlFor="status_done">Done</label>
              <input type="radio"
                id="status_done" 
                name="done"
                onChange={handleRadioChange}
                value="true"
                checked={currentTask.done} 
              />
            </div>
          </form>
        
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