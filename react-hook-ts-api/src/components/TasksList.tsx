import React, { useState, useEffect, ChangeEvent } from "react";
import TaskDataService from "../services/TaskService";
import Task from '../types/Task';
import { Link } from "react-router-dom";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");
  useEffect(() => {
    retrieveTasks();
  }, []);
  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveTasks = () => {
    TaskDataService.getAll()
      .then((response: any) => {
        setTasks(response.data.tasks);
        console.log("These are tasks: ",response.data.tasks);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveTasks();
    setCurrentTask(null);
    setCurrentIndex(-1);
  };
  const setActiveTask = (task: Task, index: number) => {
    setCurrentTask(task);
    setCurrentIndex(index);
  };
  const removeAllTasks = () => {
    TaskDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    TaskDataService.findByDescription(searchTitle)
      .then((response: any) => {
        setTasks(response.data.tasks);
        setCurrentTask(null);
        setCurrentIndex(-1);
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
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveTasks}
            >
              See all
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tasks List</h4>
        <ul className="list-group">
          {tasks &&
            tasks.map((task, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                {task.description}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTasks}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTask ? (
          <div>
            <h4>Task</h4>
            <div>
              <label>
                <strong>Id:</strong>
              </label>{" "}
              {currentTask.id}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTask.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {!!currentTask.done ? "Done" : "Pending"}
            </div>
            <Link
              to={"/tasks/" + currentTask.id}
              className=""
            >
              Edit
            </Link>
            |
            <button className="badge badge-danger mr-2" onClick={() => deleteTask(currentTask.id)}>
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
export default TasksList;