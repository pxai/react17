import { FC, useState,ChangeEvent } from 'react';

type Form = {
    title: string
    question: string
};

interface Props  {};

const QuestionForm: FC<Props> = () => {
    const [values, setValues] = useState<Form>({title: '', question: ''});

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [name]: value
        })
    };

    return (
        <form>
            <legend>Question Form</legend>
            <div>
                <label htmlFor="title">Title</label>
            </div>
            <div>
                <input
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="question">Answer</label>
            </div>
            <div>
                <input
                    type="text"
                    value={values.question}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button>Save</button>
            </div>
        </form>
    );
}

export default QuestionForm;