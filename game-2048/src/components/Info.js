import React from 'react';

export default function Info(props) {
  const { score, newGame } = props;

  function handleClick() {
    console.log(props)
    newGame();
  }

  return (
    <div>
      <div className='title-head'>
        <div className='title-container'>
          <span className='info-title'>
            2048
        </span>
          <span className='info-subtitle'>
            Join the tiles, get to <b>2048!</b>
          </span>
        </div>
        <div >
          <div className='score-text'>Score:</div>
          <div className='score'>{score}</div>
        </div>
      </div>
      <div className='buttons-container'>
        <button className='btn'>Settings</button>
        <button className='btn'>Best Scores</button>
        <button className='btn' onClick={handleClick}>New Game</button>
      </div>
    </div>
  )
}