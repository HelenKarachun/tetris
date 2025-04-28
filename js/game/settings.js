export const squareSize = 32;

export const fieldColumns = 10;
export const fieldRows = 20;

export const initialPositionOfFigure = -2;

export let startSpeedIndex = 0;
export let finishSpeedIndex = 45;

export const initialLevelValue = 1;
export const initialScoreValue = 0;
export const droppedRowsNeededForNextLevel = 5;
export const dropSound = new Audio("./audio/figure-drop.mp3");
export const scoreForRows = {
  oneDroppedRow: 100, 
  twoDroppedRows: 300,
  threeDroppedRows: 700, 
  fourDroppedRows: 1500,
};

export const figures = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
