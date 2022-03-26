import React, { useState, useEffect,  ChangeEvent } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import TaskDataService from "../services/TaskService";
import Task from '../types/Task';
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

const TaskDetail: React.FC<any> = (props: any) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>(props.initialTaskState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };
  const getTask = (id: string) => {
    TaskDataService.get(id)
      .then((response: any) => {
        setTask(response.data.task);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteTask = (id: string) => {
    TaskDataService.remove(id)
      .then((response: any) => {
        console.log(response.data.task);
        navigate("/tasks");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTask(`${id}`);
  }, [id]);

  return (
    <div className="list row">
      <div className="col-md-12">
        {task ? (
          <div>
            <h4>Task</h4>
            <div>
              <label>
                <strong>Id:</strong>
              </label>{" "}
              {task.id}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {task.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {!!task.done ? "Done" : "Pending"}
            </div>
            <Link to={"/tasks/edit/" + task.id} className="">
              Edit
            </Link>
            |
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
      </div>
  );
};
export default TaskDetail;