import React, { FC }from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import TasksList from "./components/TasksList";
import TaskDetail from "./components/TaskDetail";

 //           <Route exact path={["/", "/tasks"]} element={TasksList} />
const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tasks" className="navbar-brand">
          Sample
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tasks"} className="nav-link">
              Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/tasks/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/tasks/edit/:id" element={<UpdateTask />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
