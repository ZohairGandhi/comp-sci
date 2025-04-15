function knightMoves(startSquare, endSquare) {
  const rowOffsets = [2, 1, -1, -2, -2, -1, 1, 2];
  const colOffsets = [1, 2, 2, 1, -1, -2, -2, -1];
  const squaresToVisit = [];
  squaresToVisit.push(startSquare);

  const visitedSquares = [];
  for (let i = 0; i < 8; i += 1) {
    visitedSquares[i] = [];
    for (let j = 0; j < 8; j += 1) {
      visitedSquares[i].push(null);
    }
  }
  visitedSquares[startSquare[0]][startSquare[1]] = startSquare;

  let currentSquare;
  while (squaresToVisit.length > 0) {
    currentSquare = squaresToVisit.shift();

    if (
      currentSquare[0] === endSquare[0] &&
      currentSquare[1] === endSquare[1]
    ) {
      break;
    } else {
      for (let i = 0; i < 8; i += 1) {
        const newRow = currentSquare[0] + rowOffsets[i];
        const newCol = currentSquare[1] + colOffsets[i];

        if (isValidSquare([newRow, newCol])) {
          if (visitedSquares[newRow][newCol] === null) {
            visitedSquares[newRow][newCol] = currentSquare;
            squaresToVisit.push([newRow, newCol]);
          }
        }
      }
    }
  }

  const shortestPath = [];
  while (
    currentSquare[0] !== startSquare[0] &&
    currentSquare[1] !== startSquare[1]
  ) {
    shortestPath.push(currentSquare);
    currentSquare = visitedSquares[currentSquare[0]][currentSquare[1]];
  }

  shortestPath.push(startSquare);
  return shortestPath.reverse();
}

function isValidSquare(square) {
  return square[0] >= 0 && square[0] <= 7 && square[1] >= 0 && square[1] <= 7;
}

console.log(knightMoves([0, 0], [3, 3]));
