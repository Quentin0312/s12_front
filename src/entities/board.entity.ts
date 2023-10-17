import { Network } from "synaptic";

// TODO: Déplacer ces elts dans ce fichier
import { PiecePosType } from "../components/board";

import { GameStepEnum, PieceEnum } from "../components/gameContext";
import { checkNull, checkWinGlobal } from "../utils/board.utils";

type boardStateDictType = { [key: number]: PieceEnum[] };
type CopyBoardType = {
  board: boardStateDictType;
  turn: PieceEnum;
  situation: GameStepEnum.win | GameStepEnum.draw | GameStepEnum.playing;
  winningPieces: PiecePosType[];
};

// TODO: Use diff type for GameStepEnum etc ?

export class Board {
  board: boardStateDictType;
  turn: PieceEnum;
  rows: number[];
  columns: number[];
  situation: GameStepEnum.win | GameStepEnum.draw | GameStepEnum.playing;
  winningPieces: PiecePosType[];

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
  // TODO: Placer plutot dans ia.utils
  private formatForIA(): number[] {
    const iaFormatedBoard: number[] = [];
    // Careful => here red is local player and yellow is the bot
    for (let i = 0; i < 6; i++) {
      for (const piece of this.board[i]) {
        iaFormatedBoard.push(
          piece == PieceEnum.empty ? 0 : piece == PieceEnum.red ? -1 : 1
        );
      }
    }
    return iaFormatedBoard;
  }

  // ! Find a better way to keep reactivity
  // TODO: Find a better way to keep reactivity

  constructor(copyBoardInfos?: CopyBoardType) {
    this.rows = [0, 1, 2, 3, 4, 5];
    this.columns = [0, 1, 2, 3, 4, 5, 6];
    if (copyBoardInfos) {
      this.board = copyBoardInfos.board;
      this.turn = copyBoardInfos.turn;
      this.situation = copyBoardInfos.situation;
      this.winningPieces = copyBoardInfos.winningPieces;
    } else {
      this.board = this.getInitialBoard();
      this.turn = PieceEnum.red;
      this.situation = GameStepEnum.playing;
      this.winningPieces = [];
    }
  }

  public move(playerPiece: PieceEnum, column: number): boolean {
    // Check actual situation
    if (this.situation != GameStepEnum.playing) return false;

    // Check if player's turn correspond
    if (playerPiece != this.turn) return false;

    // Check if move is legal
    const moveCoord = this.getMoveCoord(column);
    if (moveCoord.row == -1) return false;

    // Update board
    this.board[moveCoord.row][moveCoord.column] = playerPiece;

    // Check situation
    this.situation = this.getSituation();

    if (this.situation != GameStepEnum.win) {
      // Switch turn
      this.switchTurn();
    } else {
      // Assign winning pieces
      this.winningPieces = checkWinGlobal(this.board);
    }

    return true;
  }
  private getIaMoves(rawOutput: number[]) {
    // let iaMoves: number[]
    const iaColumnMoves = [...rawOutput].sort((a, b) => b - a);
    return iaColumnMoves.map((columnMove) => rawOutput.indexOf(columnMove));
  }

  // TODO: Rewrite
  public iaMove(bot: Network): boolean {
    // Check actual situation
    if (this.situation != GameStepEnum.playing) return false;

    const iaFormatedBoard = this.formatForIA();
    const rawOutput = bot.activate(iaFormatedBoard);
    const iaMoves = this.getIaMoves(rawOutput);

    for (const iaMove of iaMoves) {
      const moveCoord = this.getMoveCoord(iaMove);
      if (moveCoord.row != -1) {
        this.board[moveCoord.row][moveCoord.column] = PieceEnum.yellow;
        break;
      }
    }

    this.situation = this.getSituation();

    // TODO: Refactor
    if (this.situation != GameStepEnum.win) {
      // Switch turn
      this.switchTurn();
    } else {
      // Assign winning pieces
      this.winningPieces = checkWinGlobal(this.board);
    }
    return true;
  }

  // Use this instead of board.winningPieces when reactivity not triggered
  public getWinningPieces(): PiecePosType[] {
    return checkWinGlobal(this.board);
  }

  public reset() {
    this.rows = [0, 1, 2, 3, 4, 5];
    this.columns = [0, 1, 2, 3, 4, 5, 6];
    this.board = this.getInitialBoard();
    this.turn = PieceEnum.red;
    this.situation = GameStepEnum.playing;
  }

  public getCopy() {
    return new Board({
      board: this.board,
      turn: this.turn,
      situation: this.situation,
      winningPieces: this.winningPieces,
    });
  }
}
