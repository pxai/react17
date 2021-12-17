import { useState, useEffect, useMemo, useCallback } from "react";
import initialTodos from './initialTodos';
import TodoList from "./TodoList";
import './App.css';

function App() {

  const [todoList, setTodoList] = useState(initialTodos);
  const [task, setTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const printTodoList = useCallback(() => {
    console.log("Changed todoList: ", todoList);
  }, [todoList]);

  useEffect(() => {
    printTodoList();
  }, [todoList, printTodoList]);

  const handleCreate = () => { 
    const newTask = {
      id: Date.now(),
      task
    };
    setTodoList([...todoList, newTask]);
    setTask('');
  };

  const handleSearch = () => {
    console.log(`Search: ${task}`);
    setSearchTerm(task);
  };

  const filteredTodoList = useMemo(() => todoList.filter((todo) => {
    console.log("Filtering: ", todo);
    return todo.task.toLowerCase().includes(searchTerm.toLowerCase());
  }), [searchTerm, todoList]);

  const handleDelete = useCallback((id) => {
    const changedList = todoList.filter( task => task.id !== id);
    setTodoList(changedList);
  }, [todoList]);

  const handleUpdate = useCallback((task) => {
    console.log("Received task: ", task);
    const changedList = [...todoList, task ];
  }, [todoList]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={() => handleSearch()}>Search</button>
      <button onClick={() => handleCreate()}>Add</button>
      <TodoList 
        todoList={filteredTodoList} 
        handleDelete={handleDelete}
        handleUpdate={handleUpdate} />
    </div>
  );
}

export default App;
