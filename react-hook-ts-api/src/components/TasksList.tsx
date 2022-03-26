import React, { useState, useEffect, ChangeEvent } from "react";
import TaskDataService from "../services/TaskService";
import Task from '../types/Task';
import { Link, useNavigate } from "react-router-dom";

const TasksList: React.FC = () => {
  const navigate = useNavigate();
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

  return (
    <div className="list row">
      <div className="col-md-12">
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
                className="list-group-item"
                onClick={() =>  navigate(`/tasks/${task.id}`)}
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
    </div>
  );
};
export default TasksList;