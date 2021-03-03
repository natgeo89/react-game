import React, { useState, useEffect } from 'react';
import { moveUp, moveLeft, moveDown, moveRight } from '../moveHandlers/move';

import Cell from './Cell';
import Info from './Info';
import Footer from './Footer';
import '../style/style.css';

export default function Game() {
  const gameSize = 4;
  const cellsCount = gameSize ** 2;
  const template = Array(cellsCount).fill({ value: null });

  const initArray = getCellsWithNewRandomNumber(template);
  const savedArray = getSavedGameArray();

  const [cells, setCells] = useState(savedArray || initArray);


  function handleKeyUp({ key }) {
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
        document.addEventListener('keyup', handleKeyUp, { once: true });
        return;
    }

    if (!isCellsMoved(newCells)) {
      document.addEventListener('keyup', handleKeyUp, { once: true });
      return;
    }

    const cellsWithNewNumber = getCellsWithNewRandomNumber(newCells);

    setCells(cellsWithNewNumber);
  }

  function isCellsMoved(array) {
    const movedArray = [...array].map(({ value }) => value);
    const copyCells = [...cells].map(({ value }) => value);
    return JSON.stringify(movedArray) !== JSON.stringify(copyCells);
  }

  function getSavedGameArray() {
    const arr = localStorage.getItem('current-game');
    return JSON.parse(arr);
  }

  function saveGameArrayInLS(array) {
    const arrForSave = [...array].map(({ value, isNew }) => ({ value: value, isNew: isNew }));
    localStorage.setItem('current-game', JSON.stringify(arrForSave));
  }


  function getCellsWithNewRandomNumber(cells) {
    const cellsCopy = [...cells];
    const randomIndex = getRandomEmptyIndexFrom(cellsCopy);
    const randomValue = Math.random() < 0.5 ? 2 : 4;

    return cellsCopy.map(({ value, isMerged }, ind) => {
      const val = randomIndex === ind ? randomValue : value;
      const isNew = randomIndex === ind ? true : false;
      return {
        value: val,
        isNew: isNew,
        isMerged: isMerged,
      }
    });
  }

  function getRandomEmptyIndexFrom(array) {
    const emptyIndexes = [...array].reduce((accum, { value }, index) => {
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
    document.addEventListener('keyup', handleKeyUp, { once: true });
    saveGameArrayInLS(cells);
  })

  return (
    <div className='wrapper'>
      <div className='game-container'>
        <Info />
        <div className='game-field'>
          {cells.map(({ value, isNew, isMerged }, index) => {
            return (
              <Cell key={index} value={value} isNew={isNew} isMerged={isMerged} />
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
