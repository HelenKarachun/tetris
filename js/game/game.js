import Tetris from "./tetrisClass.js";
import { checkRecords } from "./records.js";

let currentGameLink = null;

export function game() {
  const canvas1 = document.getElementById("canvas");
  const gameContainer = document.querySelector(".game-container");
  const divForGameOverContent = document.createElement("div");
  const level = document.getElementById("levelValue");
  const score = document.getElementById("scoreValue");

  const gameField = new Tetris(canvas1);
  let previousLevel = gameField.level;
  let previousScore = gameField.score;

  const shadowEffect = 2;
  const dividedSquareEffect = 1;

  currentGameLink = gameField;
  window.addEventListener("hashchange", removeCurrentGame);
  divForGameOverContent.classList.add("container-for-game-over");

  canvas1.focus();

  gameField.animationID = requestAnimationFrame(() => startGame(gameField));
  addKeyboardHandler(gameField);
  showScoreAndLevel(gameField)

  function startGame(obj) {
    obj.canvas.width = obj.canvas.width;

    updateScoreAndLevel(obj);

    for (let row = 0; row < obj.row; row++) {
      for (let column = 0; column < obj.column; column++) {
        if (obj.field[row][column]) {
          drawSquare(
            obj.ctx,
            column * obj.squareSize,
            row * obj.squareSize,
            obj.squareSize - dividedSquareEffect,
            "rgb(252, 151, 0)"
          );
        }
      }
    }

    if (obj.figure) {
      if (++obj.startSpeedIndex > obj.finishSpeedIndex) {
        obj.figure.row++;
        obj.startSpeedIndex = 0;
      }

      if (!obj.isValidPosition()) {
        obj.figure.row--;
        obj.placeFigure();
      }

      for (let row = 0; row < obj.figure.figureMatrix.length; row++) {
        for (
          let column = 0;
          column < obj.figure.figureMatrix[row].length;
          column++
        ) {
          if (obj.figure.figureMatrix[row][column]) {
            drawSquare(
              obj.ctx,
              (obj.figure.column + column) * obj.squareSize,
              (obj.figure.row + row) * obj.squareSize,
              obj.squareSize - dividedSquareEffect,
              "rgb(125, 249, 255)"
            );
            drawSquare(
              obj.ctx,
              (obj.figure.hintColumn + column) * obj.squareSize,
              (obj.figure.hintRow + row) * obj.squareSize,
              obj.squareSize - dividedSquareEffect,
              "rgb(125, 249, 255, 0.2)"
            );
          }
        }
      }

      if (obj.gameOver) {
        return gameOver(obj);
      }
    }

    obj.animationID = requestAnimationFrame(() => startGame(obj));
  }

  function drawSquare(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(
      x + size - shadowEffect,
      y + shadowEffect,
      shadowEffect,
      size - shadowEffect
    );
    ctx.fillRect(
      x + shadowEffect,
      y + size - shadowEffect,
      size - shadowEffect,
      shadowEffect
    );

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(x, y, shadowEffect, size - shadowEffect);
    ctx.fillRect(x, y, shadowEffect - shadowEffect, shadowEffect);
  }

  function gameOver(obj) {
    divForGameOverContent.innerHTML = `${obj.score}`;
    gameContainer.append(divForGameOverContent);
    cancelAnimationFrame(obj.animationID);
    setTimeout(() => {
      location.hash = "#records";
      setTimeout(() => checkRecords(obj.score), 0);
    }, 4000);
  }

  function addKeyboardHandler(obj) {
    obj.canvas.addEventListener("keydown", () => keydownPressed(obj));
  }

  function keydownPressed(obj) {
    if (obj.gameOver) {
      return;
    }
    switch (event.which) {
      case 37:
        obj.moveFigureLeft();
        break;
      case 39:
        obj.moveFigureRight();
        break;
      case 40:
        obj.moveFigureDown();
        break;
      case 38:
        obj.dropFigureDown();
        break;
      case 32:
        obj.rotateFigure();
        break;
    }
  }

  function showScoreAndLevel(obj) {
    level.innerText = obj.level;
    score.innerText = obj.score;
  }

  function updateScoreAndLevel(obj) {
    if (obj.level > previousLevel || obj.score > previousScore) {
      previousLevel = obj.level;
      previousScore = obj.score;
      showScoreAndLevel(obj);
    }
  }

  function removeCurrentGame() {
    cancelAnimationFrame(currentGameLink.animationID);
    window.removeEventListener("hashchange", removeCurrentGame);
    currentGameLink = null;
  }
}
