import { render, screen, cleanup } from '@testing-library/react';
import Task from './Task';

describe('Task', () => {
    let task;

    beforeEach(() => {
        task = { id: 2, task: "Learn React", handleDelete: null};
    });

    it('renders task with properties', () => {

        const wrapper = render(<Task {...task} />);
        const taskElement = wrapper.getByText(/2\: Learn React/);
    
        expect(taskElement).toBeInTheDocument();
    });

    it('renders a button', () => {
        const wrapper = render(<Task {...task} />);
        const buttonElement = wrapper.getByRole('button');

        expect(buttonElement).toBeInTheDocument();
    });

    afterAll(cleanup);
});
