import { PageEnum, actualPage } from "../App";
import { boardState } from "../components/board";
import {
  GameStepEnum,
  PieceEnum,
  gameStep,
  turn,
} from "../components/gameContext";
import { checkWinGlobal } from "./winDetection.utils";

// TODO: Rewrite with formator
export function checkNull() {
  if (gameStep() == GameStepEnum.playing) {
    const emptyPos = boardState()[0].filter(
      (piece) => piece == PieceEnum.empty
    );
    if (emptyPos.length == 0) {
      console.log("tie");
      return true;
    } else return false;
  }
}

// TODO: Do something cleaner with playerPieceColor in case online or ia
export function isMoveLegal(
  row: number,
  column: number,
  playerPieceColor: PieceEnum
): boolean {
  // Check if it's player's turn
  if (actualPage() == PageEnum.online || actualPage() == PageEnum.ia) {
    if (turn() != playerPieceColor) return false;
  }

  // Check if the move is off board
  if (row > 5 || row < 0 || column > 6 || column < 0) return false;

  // Check if case is empty
  if (boardState()[row][column] == PieceEnum.empty) {
    // Check if it's the 'first' empty slot of the column (not really)
    if (row == 5) return true;
    else if (boardState()[row + 1][column] != PieceEnum.empty) return true;
  }
  return false;
}

export function getSituation() {
  // Check win situations
  const totalWinningPieces = checkWinGlobal();
  if (totalWinningPieces.length > 0) {
    return GameStepEnum.win;

    // Check null situations
  } else if (checkNull()) {
    return GameStepEnum.draw;
  } else return GameStepEnum.playing;
}
