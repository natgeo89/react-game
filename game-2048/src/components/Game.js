import React, {useState, useEffect} from 'react';
import {moveUp, moveLeft, moveDown, moveRight} from '../moveHandlers/move';

import Cell from './Cell';
import '../style/style.css';

export default function Game() {
  const gameSize = 4;
  const cellsCount = gameSize**2;
  const template = Array(cellsCount).fill({value: null});

  const initArray = getCellsWithNewRandomValue(template);
  
  const [cells, setCells] = useState(initArray);

  function handleKeyUp({key}) {

    let newCells;

    switch (key) {
      case 'ArrowUp':
        newCells = moveUp(cells);
        break;
      case 'ArrowLeft':
        newCells = moveLeft(cells);
        break;
      case 'ArrowDown':
        newCells = moveDown(cells);
        break;
      case 'ArrowRight':
        newCells = moveRight(cells);
        break;
      default: 
        document.addEventListener('keyup', handleKeyUp, {once: true});
        break;
    }

    setCells(getCellsWithNewRandomValue(newCells));    
  }


  function getCellsWithNewRandomValue(cells) {
    const cellsCopy = [...cells];
    const randomIndex = getRandomEmptyIndexFrom(cellsCopy);
    const randomValue = Math.random() < 0.5 ? 2 : 4;

    return cellsCopy.map(({value}, ind) => ({value: randomIndex === ind ? randomValue : value}));
  }

  function getRandomEmptyIndexFrom(array) {
    const emptyIndexes = [...array].reduce((accum, {value}, index) => {
      if (value === null) {
        return [...accum, index]
      } else {
        return accum;
      }
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);

    return emptyIndexes[randomIndex];
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp, {once: true});
  })

  return (
    <div className='game-field'>
        {cells.map(({value}, index) => {
          return (
            <Cell key={index} value={value}/>
          )
        })}
    </div>
  )
}
