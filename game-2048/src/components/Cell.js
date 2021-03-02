import React from 'react';
// import ReactDOM from 'react-dom';
// import '../style/game.css';

export default function Cell(props) {
  const {value} = props;

  return (
    <div className={`cell cell-${value}`}>{value}
    </div>
  )
}