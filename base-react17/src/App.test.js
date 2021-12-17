import { render, screen, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    //jest.spyOn(window, 'fetch');
  });

  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Start/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  it('renders next button', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Next/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it.skip('fetches data from server', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    await act(() => {
      render(<App />);
    });
    expect(window.fetch).toHaveBeenCalledTimes(1)
  });
});

