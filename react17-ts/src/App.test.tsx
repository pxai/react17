import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders learn react link', () => {
    render(<App />);
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });
});

