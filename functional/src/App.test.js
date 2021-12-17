import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch');
  });

  it('renders learn react link', () => {
    render(<App />);
    const titleElement = screen.getByText(/Todo List/i);
    expect(titleElement).toBeInTheDocument();
  });

  it.skip('calls fetch', () => {
    render(<App />);
    const data = {};
    expect(window.fetch).toHaveBeenCalledWith(
      '/checkout',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(data),
      }),
    )
    expect(window.fetch).toHaveBeenCalledTimes(1)
  });

  it('renders learn react link', () => {
    const wrapper = render(<App />);
    const titleElement = screen.getByText(/Todo List/i);

    expect(wrapper.getByText(/Todo List/i)).toBeInTheDocument();
  });

  it('renders 4 buttons', () => {
    const wrapper = render(<App />);
    const buttonElements = wrapper.getAllByRole('button');

    expect(buttonElements.length).toBe(4);
  });

  it('renders 4 buttons', () => {
    const wrapper = render(<App />);
    const buttonElements = wrapper.getAllByRole('button');

    expect(buttonElements.length).toBe(4);
  });

  describe('Delete', () => {
    it('deletes an element', () => {
      const wrapper = render(<App />);
      let buttonElements = wrapper.getAllByRole('button');
      let taskElement = wrapper.getByText(/2\: Buy Coffee/i);
  
      expect(buttonElements.length).toBe(4);
      expect(taskElement).toBeInTheDocument();

      userEvent.click(buttonElements[3]);
    
      buttonElements = wrapper.getAllByRole('button');
      taskElement = wrapper.queryByText(/2\: Buy Coffee/);

      expect(buttonElements.length).toBe(3);
      expect(taskElement).not.toBeInTheDocument();
    });
  });

  describe('search', () => {
    it('should search', () => {
      const wrapper = render(<App />);
      const input = wrapper.container.querySelector('input')
      fireEvent.change(input, {target: { value: "aa"}});
    })
  })

  afterAll(cleanup);
});

