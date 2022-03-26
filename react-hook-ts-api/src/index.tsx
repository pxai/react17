import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from 'services/Server';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
} 
//import { loadMirageInDev } from './services/MockServer';
//loadMirageInDev('http://localhost:3000/api')

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();