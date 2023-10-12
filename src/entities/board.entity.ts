// TODO: Déplacer ces elts dans ce fichier
import { PiecePosType, boardStateDictType } from "../components/board";

import { GameStepEnum, PieceEnum } from "../components/gameContext";
import { checkNull, checkWinGlobal } from "../utils/board.utils";

// import { checkNull, checkWinGlobal } from "../utils/winDetection.utils";

// TODO: Use diff type for GameStepEnum ets ?

export class Board {
  board: boardStateDictType;
  turn: PieceEnum;
  private rows: number[];
  situation: GameStepEnum.win | GameStepEnum.draw | GameStepEnum.playing;

  private getInitialBoard(): boardStateDictType {
    const initialBoardStateDict: boardStateDictType = {};

    for (const row of this.rows) {
      initialBoardStateDict[row] = Array(7).fill(PieceEnum.empty);
    }
    return initialBoardStateDict;
  }

  // row: -1 returned by this function correspond to ilegal moves
  private getMoveCoord(column: number): PiecePosType {
    if (column > 6 || column < 0) return { row: -1, column: -1 };

    for (const row of [...this.rows].reverse()) {
      if (this.board[row][column] == PieceEnum.empty) {
        return { row, column };
      }
    }

    return { row: -1, column };
  }

  private switchTurn() {
    this.turn = this.turn == PieceEnum.red ? PieceEnum.yellow : PieceEnum.red;
  }

  private getSituation():
    | GameStepEnum.win
    | GameStepEnum.draw
    | GameStepEnum.playing {
    // Check win situations
    const totalWinningPieces = checkWinGlobal(this.board);
    if (totalWinningPieces.length > 0) {
      return GameStepEnum.win;

      // Check null situations
    } else if (checkNull(this.board)) {
      return GameStepEnum.draw;
    } else return GameStepEnum.playing;
  }

  constructor() {
    this.rows = [0, 1, 2, 3, 4, 5];
    this.board = this.getInitialBoard();
    this.turn = PieceEnum.red;
    this.situation = GameStepEnum.playing;
  }

  public move(
    playerPiece: PieceEnum,
    column: number
  ): { isMoveLegal: boolean; situation?: GameStepEnum } {
    // Check actual situation
    if (this.situation != GameStepEnum.playing) return { isMoveLegal: false };

    // Check if player's turn correspond
    if (playerPiece != this.turn) return { isMoveLegal: false };

    // Check if move is legal
    const moveCoord = this.getMoveCoord(column);
    if (moveCoord.row == -1) return { isMoveLegal: false };

    // Update board
    this.board[moveCoord.row][moveCoord.column] = playerPiece;

    // Switch turn
    this.switchTurn();

    // Check situation
    this.situation = this.getSituation();

    return { isMoveLegal: true, situation: this.situation };
  }
}
