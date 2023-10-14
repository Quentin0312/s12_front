import { createEffect, createSignal } from "solid-js";

import { PieceEnum } from "./gameContext";
import { boardState, winningPieces } from "./board";

import { playerPieceColor } from "./onlineGameBis";

import { isMoveLegal } from "../utils/game.utils";

import "./boardItem.css";

type BoardItemProps = {
  row: number;
  column: number;
};
type PlayerMoveType = {
  row: number;
  column: number;
};

export const [playerMove, setPlayerMove] = createSignal<PlayerMoveType>();

function onClickOnline(row: number, column: number) {
  // TODO: Change to be able to click on the whole column
  if (!isMoveLegal(row, column, playerPieceColor() as PieceEnum)) return;
  setPlayerMove({ row, column });
}

export default function (props: BoardItemProps) {
  const [fillColor, setFillColor] = createSignal<PieceEnum>(PieceEnum.empty);
  const [isBlinking, setIsBlinking] = createSignal(false);

  createEffect(() => {
    setFillColor(boardState()[props.row][props.column]);
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
      height="100"
      width="100"
      onClick={() => onClickOnline(props.row, props.column)}
    >
      <circle
        class={isBlinking() ? "blink" : ""}
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="1"
        fill={fillColor()}
      />
    </svg>
  );
}
