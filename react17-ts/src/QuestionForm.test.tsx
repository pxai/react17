import { render, cleanup } from '@testing-library/react';
import QuestionForm from './QuestionForm';

describe('QuestionForm', () => {
    it('should render form legend', () => {
        const wrapper = render(<QuestionForm />);

        const formLegend = wrapper.getByText(/Question Form/);
        expect(formLegend).toBeInTheDocument();
    });

    it('should render form inputs', () => {
        const wrapper = render(<QuestionForm />);

        const inputElements = wrapper.getAllByRole('textbox');
        expect(inputElements.length).toBe(2);
    });

    it('should render form button', () => {
        const wrapper = render(<QuestionForm />);

        const buttonElement = wrapper.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    afterAll(cleanup);
});