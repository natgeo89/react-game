function move(cells) {
  const cellsMoved = [...cells].reduce((accum, {value}, index) => {
    const isCellEmpty = value === null;
    let prevCell = accum[index-4];
    const canMove = prevCell && (prevCell.value === null || prevCell.value === value);

    if (isCellEmpty) {
      return [...accum, {value : value, isMerged: false}];
    } else if(canMove) {
      let endIndex = index;
      while (accum[endIndex-4] && (accum[endIndex-4].value === null || accum[endIndex-4].value === value)) {
        endIndex = endIndex - 4;
      }
      
      // if values match
      if (accum[endIndex].value === value && !accum[endIndex].isMerged) {
        accum[endIndex] = {value: value * 2, isMerged: true};
        accum[index] = {value: null, isMerged: false};
      } else {
        // if values don't match, cells only moving at endIndex place
        accum[endIndex] = {value: value, isMerged: false};
        accum[index] = {value: null, isMerged: false};
      }
      return accum;

    } else {
      accum[index] = {value: value, isMerged: false};
      return accum;
    }
  }, [])

  return cellsMoved.map(({value}) => ({value: value}));
}

function createMatrixFromArray(array) {
  const gameSize = 4;
  return Array.from(Array(gameSize), (arr, index) => array.slice(index * gameSize, gameSize * (index + 1)));
}

function rotateArray(array) {
  const matrix = createMatrixFromArray([...array]);
  const rotatedMatrix = matrix[0].map((col, i) => matrix.map(row => row[i]).reverse());

  return rotatedMatrix.flat();
}

export function moveUp(cells) {
  return move(cells);
}

export function moveLeft(cells) {
  const rotatedArray = rotateArray(cells);
  const movedArray = move(rotatedArray);
  return rotateArray(rotateArray(rotateArray(movedArray)));
}

export function moveDown(cells) {
  const rotatedArray = rotateArray(rotateArray(cells))
  const movedArray = move(rotatedArray);
  return rotateArray(rotateArray(movedArray));
}

export function moveRight(cells) {
  const rotatedArray = rotateArray(rotateArray(rotateArray(cells)))
  const movedArray = move(rotatedArray);
  return rotateArray(movedArray);
}
