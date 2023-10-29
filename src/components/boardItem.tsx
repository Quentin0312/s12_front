import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

import { PieceEnum, turn } from "./gameContext";
import {
  PiecePosType,
  rows,
  boardState,
  winningPieces,
  posLastPiece,
  dimBoard,
} from "./board";

import { playerPieceColor } from "./onlineGameBis";

import { isMoveLegal } from "../utils/game.utils";

import "./boardItem.css";
import { PageEnum, actualPage } from "../App";

type BoardItemProps = {
  row: number;
  column: number;
};
type PlayerMoveType = {
  row: number;
  column: number;
};

export const [playerMove, setPlayerMove] = createSignal<PlayerMoveType>();

function getMoveCoord(column: number): PiecePosType {
  if (column > 6 || column < 0) return { row: -1, column: -1 };

  for (const row of [...rows].reverse()) {
    if (boardState()[row][column] == PieceEnum.empty) {
      return { row, column };
    }
  }

  return { row: -1, column };
}

function onClickOnline(row: number, column: number) {
  // Check if it's player's turn
  if (actualPage() == PageEnum.online || actualPage() == PageEnum.ia) {
    if (turn() != playerPieceColor()) return;
  }

  const _playerMove = getMoveCoord(column);
  if (_playerMove.row == -1 || _playerMove.column == -1) return;

  setPlayerMove(_playerMove);
}

export default function (props: BoardItemProps) {
  const [fillColor, setFillColor] = createSignal<PieceEnum>(PieceEnum.empty);
  const [isBlinking, setIsBlinking] = createSignal(false);

  createEffect(() => {
    setFillColor(boardState()[props.row][props.column]);
    if (
      props.row == posLastPiece().row &&
      props.column == posLastPiece().column
    ) {
      //setHighlightingPiece(true)
      setIsBlinking(true);
    } else setIsBlinking(false); //setHighlightingPiece(false)
  });

  createEffect(() => {
    if (
      winningPieces().filter(
        (piece) => piece.column == props.column && piece.row == props.row
      ).length > 0
    ) {
      setIsBlinking(true);
    } else {
      setIsBlinking((prev) => (prev ? false : prev));
    }
  });

  return (
    <svg
      height={dimBoard().h}
      width="100"
      onClick={() => onClickOnline(props.row, props.column)}
    >
      <circle
        class={isBlinking() ? "blink" : ""}
        cx={dimBoard().cx}
        cy={dimBoard().cy}
        r={dimBoard().r}
        stroke="black"
        stroke-width="1"
        fill={fillColor()}
      />
    </svg>
  );
}
