import {
  squareSize,
  fieldColumns,
  fieldRows,
  figures,
  startSpeedIndex,
  finishSpeedIndex,
  initialPositionOfFigure,
  dropSound,
  initialLevelValue,
  initialScoreValue,
  droppedRowsNeededForNextLevel,
  scoreForRows,
} from "./settings.js";

export default class Tetris {
  constructor(elem) {
    this.canvas = elem;
    this.ctx = this.canvas.getContext("2d");
    this.row = fieldRows;
    this.column = fieldColumns;
    this.startSpeedIndex = startSpeedIndex;
    this.finishSpeedIndex = finishSpeedIndex;
    this.animationID = null;
    this.gameOver = false;
    this.level = initialLevelValue;
    this.score = initialScoreValue;
    this.droppedRows = null;
    this.init();
    this.getFigure();
  }

  init() {
    this.squareSize = squareSize;
    this.canvas.width = this.squareSize * this.column;
    this.canvas.height = this.squareSize * this.row;
    this.canvas.style.aspectRatio = `${this.canvas.width}/${this.canvas.height}`;
    this.canvas.tabIndex = 0;
    this.field = this.getFieldArray();
  }

  getFieldArray() {
    const matrix = [];
    for (let row = 0; row < this.row; row++) {
      matrix[row] = [];
      for (let col = 0; col < this.column; col++) {
        matrix[row][col] = 0;
      }
    }
    return matrix;
  }

  getFigure() {
    const allFigures = Object.keys(figures);
    const currentFigure = this.getRandomFigure(allFigures);
    const figureMatrix = figures[currentFigure];

    const column = this.column / 2 - Math.floor(figureMatrix.length / 2);
    const row = initialPositionOfFigure;

    this.figure = {
      currentFigure,
      figureMatrix,
      column,
      row,
      hintColumn: column,
      hintRow: row,
    };

    this.calculateHintPosition();
  }

  getRandomFigure(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  calculateHintPosition() {
    const currentRow = this.figure.row;
    this.figure.row++;
    while (this.isValidPosition()) {
      this.figure.row++;
    }
    this.figure.hintRow = this.figure.row - 1;
    this.figure.hintColumn = this.figure.column;
    this.figure.row = currentRow;
  }

  moveFigureDown() {
    this.figure.row += 1;
    if (!this.isValidPosition()) {
      this.figure.row -= 1;
      this.placeFigure();
    }
  }

  dropFigureDown() {
    this.figure.row = this.figure.hintRow;
    this.placeFigure();
  }

  moveFigureLeft() {
    this.figure.column -= 1;
    if (!this.isValidPosition()) {
      this.figure.column += 1;
    } else {
      this.calculateHintPosition();
    }
  }

  moveFigureRight() {
    this.figure.column += 1;
    if (!this.isValidPosition()) {
      this.figure.column -= 1;
    } else {
      this.calculateHintPosition();
    }
  }

  rotateFigure() {
    const previousMatrix = this.figure.figureMatrix;
    const rotateMatrix = this.rotateMatrix();
    this.figure.figureMatrix = rotateMatrix;
    if (!this.isValidPosition()) {
      this.figure.figureMatrix = previousMatrix;
    } else {
      this.calculateHintPosition();
    }
  }

  rotateMatrix() {
    const n = this.figure.figureMatrix.length;
    const rotatedMatrix = [];
    for (let i = 0; i < n; i++) {
      rotatedMatrix[i] = [];
      for (let j = 0; j < n; j++) {
        rotatedMatrix[i][j] = this.figure.figureMatrix[n - j - 1][i];
      }
    }
    return rotatedMatrix;
  }

  isValidPosition() {
    for (let row = 0; row < this.figure.figureMatrix.length; row++) {
      for (let column = 0; column < this.figure.figureMatrix.length; column++) {
        if (this.figure.figureMatrix[row][column]) {
          if (
            this.figure.column + column < 0 ||
            this.figure.column + column >= this.column ||
            this.figure.row + row >= this.field.length
          ) {
            return false;
          }
          if (this.checkCollision(row, column)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  checkCollision(row, column) {
    return this.field[this.figure.row + row]?.[this.figure.column + column];
  }

  placeFigure() {
    for (let row = 0; row < this.figure.figureMatrix.length; row++) {
      for (let column = 0; column < this.figure.figureMatrix.length; column++) {
        if (this.figure.figureMatrix[row][column]) {
          if (this.figure.row + row < 0) {
            return (this.gameOver = true);
          }
          this.field[this.figure.row + row][this.figure.column + column] =
            this.figure.currentFigure;
        }
      }
    }
    this.addDropSound();
    this.deleteFilledRows();
    this.getFigure();
  }

  deleteFilledRows() {
    const filledRows = [];
    for (let row = 0; row < this.row; row++) {
      if (this.field[row].every((cell) => !!cell)) {
        filledRows.push(row);
      }
    }

    if (filledRows.length > 0) {
      this.trackLevel(filledRows.length);
      this.trackScore(filledRows.length);
      this.saveDroppedRows(filledRows.length);
      console.log(`Сброшенные линии ${this.droppedRows}`);
    }

    filledRows.forEach((rowForDelete) => {
      for (let row = rowForDelete; row > 0; row--) {
        this.field[row] = this.field[row - 1];
      }
      this.field[0] = new Array(this.column).fill(0);
    });
  }

  addDropSound() {
    dropSound.play();
    dropSound.currentTime = 0;
  }

  saveDroppedRows(numberOfDroppedRows) {
    this.droppedRows += numberOfDroppedRows;
  }

  trackScore(numberOfDroppedRows) {
    switch (numberOfDroppedRows) {
      case 1:
        this.score += scoreForRows.oneDroppedRow * this.level;
        break;
      case 2:
        this.score += scoreForRows.twoDroppedRows * this.level;
        break;
      case 3:
        this.score += scoreForRows.threeDroppedRows * this.level;
        break;
      case 4:
        this.score += scoreForRows.fourDroppedRows * this.level;
        break;
    }
  }

  trackLevel(numberOfDroppedRows) {
    const borderLevel = Math.trunc(
      this.droppedRows / droppedRowsNeededForNextLevel
    );
    const borderNextLevel = Math.trunc(
      (this.droppedRows + numberOfDroppedRows) / droppedRowsNeededForNextLevel
    );

    if (borderNextLevel > borderLevel) {
      this.level += 1;
      this.finishSpeedIndex -= 5;
    }

    if (this.finishSpeedIndex <= 5) {
      this.finishSpeedIndex = 5;
    }

    console.log(`Скорость ${this.finishSpeedIndex}`);
  }
}
