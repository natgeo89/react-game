import React from 'react';

export default function Info(props) {

  return (
    <div>
      <div className='title-container'>
        <span className='info-title'>
          2048
        </span>
        <span className='info-subtitle'>
          Join the tiles, get to <b>2048!</b>
        </span>
      </div>
      <div className='buttons-container'>
        <button className='btn'>Settings</button>
        <button className='btn'>Best Scores</button>
        <button className='btn'>New Game</button>
      </div>
    </div>
  )
}