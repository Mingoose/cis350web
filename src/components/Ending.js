/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import '../assets/Ending.css';
import { React, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import Game from './Game';
import App from './App';
import questionsList from '../assets/questions.json';
import '../assets/DeleteButton.css';

function Ending({ score, highscore, username }) {
  Ending.propTypes = { // propType validation
    score: PropTypes.string.isRequired,
    highscore: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };
  const [, stateRetry] = useState(false); // state for retry
  const [, stateLogout] = useState(false); // state for logout
  const [, deletedSet] = useState(false); // state for delete
  const deleted = useRef(false); // ref for delete
  const retryRef = useRef(false); // ref for retry
  const logoutRef = useRef(false); // ref for logout
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
  const handleClick = () => { // delete event handler
    localStorage.removeItem(username);
    deletedSet(true);
    deleted.current = true;
  };
  const buttonPress = (event) => { // retry and logout event handler
    if (event.target.value === 'Retry') {
      retryRef.current = true;
      stateRetry(true);
    } else if (event.target.value === 'Logout') {
      logoutRef.current = true;
      stateLogout(true);
    }
  };
  if (retryRef.current) {
    return (
      <Game questionslist={questionsList} username={username} highscore={highscore} />
    );
  }
  if (logoutRef.current) {
    return (
      <App />
    );
  }
  if (deleted.current) {
    return (
      <App />
    );
  }
  return ( // ending html
    <div className="Ending">
      <br />
      <div className="wideBox1">
        Score:
        {score}
      </div>
      <div className="wideBox1">
        Highscore:
        {highscore}
      </div>
      <br />
      <br />
      <div className="wideBox1">
        Leaderboard
        <br />
        <br />
        1.
        {topUser1}
        :
        {topScore1}
        <br />
        2.
        {topUser2}
        :
        {topScore2}
        <br />
        3.
        {topUser3}
        :
        {topScore3}
        <br />
      </div>
      <table className="container1">
        <tr>
          <button className="smBox1" value="Retry" type="button" onClick={buttonPress}>Retry</button>
          <td className="divider">&nbsp;</td>
          <button className="smBox2" value="Logout" type="button" onClick={buttonPress}>Logout</button>
        </tr>
      </table>
      <div className="DeleteButton" role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
        <div className="wideBox4"> Delete Account </div>
      </div>
    </div>
  );
}

export default Ending;
