import { memo, useState, useEffect } from "react";

const Task = ({id, task, handleDelete, handleUpdate})  => {
    const [edit, setEdit] = useState(false);
    const [taskValue, setTaskValue] = useState(task);

    const setTask = (e) => {
        setTaskValue(e.target.value);
    };

    const handleSave = (e) => {
        handleUpdate({id, taskValue});
        setEdit(false);
    }

    const handleEdit = () => {
        setEdit(true);
    };

    useEffect(() => {
        console.log("Rendering Task: ", id);
    });
    return (
        edit ?
            <div data-testid="taskDiv">
                <input type="text" value={taskValue} onChange={setTask}/>
                <button onClick={handleSave}>Save</button>
            </div>
        : <div data-testid="taskDiv">
            {id}: {task}
            <button onClick={() => handleDelete(id)}>Del</button>
            <button onClick={() => handleEdit(id)}>Update</button>
        </div>
    )
}

export default memo(Task);