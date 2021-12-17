import { FC, useEffect, memo } from 'react';
import Task from './Task';

const TodoList= ({todoList, handleDelete, handleUpdate}) => {
    useEffect(() => {
        console.log("Render TodoList: ", todoList);
    });
    return (
        <div >
            {todoList.map( task =>
                <Task 
                    key={task.id} {...task}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate} 
                />
            )}
        </div>
    )
} 

export default memo(TodoList);