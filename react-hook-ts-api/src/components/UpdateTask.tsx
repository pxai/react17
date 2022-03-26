import React, { useState, useEffect,  ChangeEvent } from "react";
import TaskDataService from "../services/TaskService";
import Task from '../types/Task';

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

const UpdateTask: React.FC<any> = (props: any) => {
  const [task, setTask] = useState<Task>(props.initialTaskState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };
  const getTask = (id: string) => {
    TaskDataService.get(id)
      .then((response: any) => {
        setTask(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getTask(props.match.params.id);
  }, [props.match.params.id]);

  const updateTask = () => {
    var data = {
      description: task.description,
      done: !!task.done
    };
    TaskDataService.update(task.id, data)
      .then((response: any) => {
        setTask({
          id: response.data.id,
          description: response.data.description,
          done: !!response.data.done
        });
        setSubmitted(true);

        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You updated successfully!</h4>
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
          <button onClick={updateTask} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default UpdateTask;