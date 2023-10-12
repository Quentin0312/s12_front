import {
  boardStateDictType,
  columns,
  rows,
  WinningPiecesType,
} from "../components/board";
import {
  gameStep,
  GameStepEnum,
  PieceEnum,
  turn,
} from "../components/gameContext";
import { checkWin } from "./winDetection.utils";

export function checkNull(board: boardStateDictType) {
  if (gameStep() == GameStepEnum.playing) {
    const emptyPos = board[0].filter((piece) => piece == PieceEnum.empty);
    if (emptyPos.length == 0) {
      console.log("tie");
      return true;
    } else return false;
  }
}

export function checkWinGlobal(board: boardStateDictType) {
  const totalWinningPieces: WinningPiecesType = [];

  for (const row of rows) {
    for (const column of columns) {
      const winningPieces = checkWin(row, column, board);
      if (winningPieces.length > 0) {
        console.log(turn() + "wins");
        totalWinningPieces.push(...winningPieces);
      }
    }
  }
  return totalWinningPieces;
}
