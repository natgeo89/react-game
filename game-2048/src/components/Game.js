import React from 'react';
import { moveUp, moveLeft, moveDown, moveRight } from '../moveHandlers/move';

import Cell from './Cell';
import Info from './Info';
import Footer from './Footer';
import '../style/style.css';

export default class Game extends React.Component {

  constructor(props){
    super(props)
    const template = this.createTemplateArray();  
    const initArray = this.getCellsWithNewRandomNumber(template);
    const savedArray = this.getSavedGameArray();
  
    const savedScore = this.getSavedScore();

    this.state = {
      cells: savedArray || initArray,
      score: savedScore || 0,
    }
  }

  handleKeyUp = ({ key }) => {

    let newCells;

    const {cells, score} = this.state;

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
        return;
    }


    if (!this.isCellsMoved(newCells)) {
      return;
    }

    const scorePerMove = this.calcScorePerMove(newCells);
    
    if (scorePerMove !== 0) {
      const newScore = score + scorePerMove;
      this.saveScoreInLS(newScore);
      this.setState({
        score: newScore,
      });
    }

    const cellsWithNewNumber = this.getCellsWithNewRandomNumber(newCells);

    this.saveGameArrayInLS(cellsWithNewNumber);
    this.setState({
      cells: cellsWithNewNumber,
    });
  }

  createTemplateArray = () => {
    const gameSize = 4;
    const cellsCount = gameSize ** 2;
    return Array(cellsCount).fill({ value: null });
  }

  createNewGame = () => {
    const template = this.createTemplateArray();
    const initArray = this.getCellsWithNewRandomNumber(template);
    this.saveScoreInLS(0);
    this.saveGameArrayInLS(initArray);
    this.setState({
      score: 0,
      cells: initArray,
    });
  }

  isCellsMoved = (array) => {
    const movedArray = [...array].map(({ value }) => value);
    const copyCells = [...this.state.cells].map(({ value }) => value);
    return JSON.stringify(movedArray) !== JSON.stringify(copyCells);
  }

  getSavedGameArray = () => {
    const arr = localStorage.getItem('current-game');
    return JSON.parse(arr);
  }

  saveGameArrayInLS = (array) => {
    const arrForSave = [...array].map(({ value, isNew }) => ({ value: value, isNew: isNew }));
    localStorage.setItem('current-game', JSON.stringify(arrForSave));
  }

  getSavedScore = () => {
    return +localStorage.getItem('current-score');
  }
  
  saveScoreInLS = (score) => {
    localStorage.setItem('current-score', score);
  }


  getCellsWithNewRandomNumber = (cells) => {
    const cellsCopy = [...cells];
    const randomIndex = this.getRandomEmptyIndexFrom(cellsCopy);
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

  getRandomEmptyIndexFrom = (array) => {
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

  calcScorePerMove = (cells) => {
    return [...cells].reduce((accum, {value, isMerged}) => isMerged ? accum + value : accum, 0);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='game-container'>
          <Info newGame={this.createNewGame} score={this.state.score}/>
          <div className='game-field'>
            {this.state.cells.map(({ value, isNew, isMerged }, index) => {
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
}
