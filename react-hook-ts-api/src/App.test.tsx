import React from 'react';
import { createServer, Server, Model } from 'miragejs';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter, } from 'react-router-dom'
import {Router} from 'react-router-dom'
import App from './App';
import { makeServer, AppRegistry } from "services/Server"

let server: Server<AppRegistry> ;
beforeEach(() => {
  server = makeServer()
})

afterEach(() => {
  server.shutdown()
})

test('renders learn react link', () => {
  render(<App />, {wrapper: MemoryRouter})
  const linkElement = screen.getByText(/Sample/i);
  expect(linkElement).toBeInTheDocument();
});
