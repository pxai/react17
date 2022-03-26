import http from '../http-common';
import Task from "../types/Task";

const getAll = () => {
  return http.get<Array<Task>>("/tasks");
};
const get = (id: any) => {
  return http.get<Task>(`/tasks/${id}`);
};
const create = (data: Task) => {
  return http.post<Task>("/tasks", data);
};
const update = (id: any, data: Task) => {
  return http.put<any>(`/tasks/${id}`, data);
};
const remove = (id: any) => {
  return http.delete<any>(`/tasks/${id}`);
};
const removeAll = () => {
  return http.delete<any>(`/tasks`);
};
const findByDescription = (description: string) => {
  return http.post<Array<Task>>("/tasks/search", { description });
};
const TaskService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByDescription,
};
export default TaskService;