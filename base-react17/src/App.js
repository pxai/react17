import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import quizEndpoint from './Server.js';
import Question from './Question';
import Sample from './Sample';

function App() {

  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    quizEndpoint().then( data => {
      console.log("This is dataaaaa: ",data);
      setQuestions(data);
    });
  }, []);

  const handleNext = (next) => { 
    if (next < questions.length)
      setCurrent(next) 
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start
        </a>
      </header>
      <div>
        <Question {...questions[current]} />
        <button onClick={() => handleNext(current + 1)}>Next</button>
        </div>
        <Sample />
    </div>
  );
}

export default App;
