/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { React, useState, useRef } from 'react';
import '../assets/App.css';
// eslint-disable-next-line import/no-cycle
import Game from './Game';
import logo from '../assets/main.jpeg';
import questionsList from '../assets/questions.json';

function App() {
  const [, setStarted] = useState(false);// state for game start
  const [, invalidEntered] = useState(false);// state for invalid input
  const start = useRef(false);// ref for game start
  const invalid = useRef(false);// ref for invalid input
  const username = useRef('');
  const highscore = useRef('0');

  function handleStart() {
    setStarted(true);
    start.current = true;
  }

  function handleInvalidInput() {
    invalidEntered(true);
    invalid.current = true;
  }

  function correctedInput() {
    invalid.current = false;
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const regEx = /^[0-9a-zA-Z]+$/;
      const input = document.getElementById('textbox').value;
      if (input.match(regEx)) { // check if alphanumeric
        if (localStorage.getItem(input) == null) { // if the username is not in local storage
          localStorage.setItem(input, '0');
          username.current = input;
          highscore.current = '0';
          handleStart();
          correctedInput();
        } else {
          username.current = input;
          highscore.current = localStorage.getItem(input);
          handleStart();
          correctedInput();
        }
      } else { // if the input is not alphanumeric
        handleInvalidInput();
      }
    }
  };

  if (invalid.current) { // invalid input
    return (
      <div className="logo">
        <img src={logo} alt="main" width="23%" />
        <p className="invalidText">USERNAME MUST BE ALPHANUMERIC. TRY AGAIN!</p>
        <input type="text" id="textbox" onKeyPress={handleKeyPress} />
        <br />
        <br />
        ENTER USERNAME HERE
      </div>
    );
  }

  if (!start.current) { // game not started
    return (
      <div className="logo">
        <img src={logo} alt="main" width="23%" />
        <div id="spacer" />
        <input type="text" id="textbox" onKeyPress={handleKeyPress} />
        <br />
        <br />
        ENTER USERNAME HERE
      </div>
    );
  }
  return ( // game started
    <Game questionslist={questionsList} highscore={highscore.current} username={username.current} />
  );
}

export default App;
