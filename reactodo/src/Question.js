import { memo, useState, useEffect } from "react";

const Question = ({id, question, handleDelete, handleUpdate})  => {
    const [edit, setEdit] = useState(false);
    const [questionValue, setQuestionValue] = useState(question);

    const setQuestion = (e) => {
        setQuestionValue(e.target.value);
    };

    const handleSave = (e) => {
        console.log("Saving: ", questionValue)
        handleUpdate({id, questionValue});
        setEdit(false);
    }

    const handleEdit = () => {
        setEdit(true);
    };

    useEffect(() => {
        console.log("Rendering Question one: ", id);
    });
    return (
        edit ?
            <div data-testid="questionDiv">
                <input type="text" value={questionValue} onChange={setQuestion}/>
                <button onClick={handleSave}>Save</button>
            </div>
        : <div data-testid="questionDiv">
            {id}: {question}
            <button onClick={() => handleDelete(id)}>Del</button>
            <button onClick={() => handleEdit(id)}>Update</button>
        </div>
    )
}

export default memo(Question);