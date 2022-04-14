/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { React, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import Ending from './Ending';
import App from './App';
import '../assets/Game.css';
import '../assets/DeleteButton.css';

function Game({ questionslist, highscore, username }) {
  Game.propTypes = { // propType validation
    questionslist: PropTypes.string.isRequired,
    highscore: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };
  const [, setStarted] = useState(10); // state for start
  const [, done] = useState(false); // state for done
  const [, deletedSet] = useState(false); // state for delete
  const deleted = useRef(false); // ref for delete
  const doneRef = useRef(false); // ref for done
  const questions = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // ref for questions
  const score = useRef(0);
  const questionNumber = useRef(0);
  const index = Math.floor(Math.random() * questions.current.length); // random index for celebrity
  const question = questionslist[questions.current[index]];

  const keys = Object.keys(localStorage); // find top 3 leaderboard
  let i = keys.length - 1;
  let topScore1 = '0';
  let topUser1 = '';
  let topScore2 = '0';
  let topUser2 = '';
  let topScore3 = '0';
  let topUser3 = '';
  while (i >= 0) {
    const UserScore = localStorage.getItem(keys[i]);
    if (parseInt(UserScore, 10) > parseInt(topScore1, 10)) {
      topScore1 = UserScore;
      topUser1 = keys[i];
    } else if (parseInt(UserScore, 10) > parseInt(topScore2, 10)) {
      topScore2 = UserScore;
      topUser2 = keys[i];
    } else if (parseInt(UserScore, 10) > parseInt(topScore3, 10)) {
      topScore3 = UserScore;
      topUser3 = keys[i];
    }
    i -= 1;
  }
  const qHandler = () => { // question event handler
    if (questionNumber.current === 10) { // if done
      done(true);
      if (parseInt(localStorage.getItem(username), 10) < parseInt(score.current, 10)) {
        localStorage.setItem(username, score.current);
      }
      doneRef.current = true;
    } else { // if not done
      questions.current.splice(index, 1);
      setStarted(questions.current.length);
    }
  };

  const handleAnswerChoice = (event) => { // answer event handler
    if (event.target.value === question.correct) { // if correct
      score.current += 1;
      questionNumber.current += 1;
      qHandler();
    } else { // if wrong
      questionNumber.current += 1;
      qHandler();
    }
  };

  const handleClick = () => { // delete event handler
    localStorage.removeItem(username);
    deletedSet(true);
    deleted.current = true;
  };

  if (deleted.current) {
    return (
      <App />
    );
  }

  if (doneRef.current) {
    return (
      <div>
        <Ending
          score={score.current}
          highscore={localStorage.getItem(username)}
          username={username}
        />
      </div>
    );
  }
  return ( // game html
    <div className="Game">
      <div className="flex-container">
        <div className="flex-child magenta">
          <div className="wideBox">
            Score:&nbsp;
            {score.current}
          </div>
          <div className="wideBox">
            Highscore: &nbsp;
            {highscore}
          </div>
          <br />
          <br />
          <div className="wideBox">Leaderboard: </div>
          <div className="container" width="100%"> </div>
          <div className="wideBox2">
            1. &nbsp;
            {topUser1}
            : &nbsp;
            {topScore1}
          </div>
          <div className="wideBox2">
            2. &nbsp;
            {topUser2}
            : &nbsp;
            {topScore2}
          </div>
          <div className="wideBox2">
            3. &nbsp;
            {topUser3}
            : &nbsp;
            {topScore3}
          </div>
        </div>

        <div className="flex-child green">
          <br />
          <img src={question.img} id="pic" alt="main" width="300px" height="300px" />
          <button className="wideBox3" value="option1" type="button" onClick={handleAnswerChoice}>{question.option1}</button>
          <button className="wideBox3" value="option2" type="button" onClick={handleAnswerChoice}>{question.option2}</button>
          <button className="wideBox3" value="option3" type="button" onClick={handleAnswerChoice}>{question.option3}</button>
          <button className="wideBox3" value="option4" type="button" onClick={handleAnswerChoice}>{question.option4}</button>
        </div>

      </div>
      <div className="DeleteButton" role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
        <div className="wideBox4"> Delete Account </div>
      </div>
    </div>
  );
}

export default Game;
