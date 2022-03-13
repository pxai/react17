import { FC, useEffect, memo } from 'react';
import Question from './Question';

const Questions= ({questions, handleDelete, handleUpdate}) => {
    useEffect(() => {
        console.log("Render questions: ", questions);
    });
    return (
        <div >
            {questions.map( question =>
                <Question 
                    key={question.id} {...question}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate} 
                />
            )}
        </div>
    )
} 

export default memo(Questions);