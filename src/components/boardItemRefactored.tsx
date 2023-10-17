import { PieceEnum, turn } from "./gameContextRefactored";
import { PiecePosType, boardState, setBoardState } from "./boardRefactored";
import { bot } from "./iaGame";

import "./boardItem.css";
import { PageEnum, actualPage } from "../App";

function triggerBoardReactivity() {
  setBoardState((prev) => {
    return prev.getCopy();
  });
}

function onclickLocal(column: number) {
  const isMoveLegal = boardState().move(turn(), column);
  if (!isMoveLegal) return;

  triggerBoardReactivity();
}

function onClickIa(column: number) {
  // Player move
  const isPlayerMoveLegal = boardState().move(PieceEnum.red, column);
  if (!isPlayerMoveLegal) return;

  triggerBoardReactivity();

  // AI move
  const isIaMoveDone = boardState().iaMove(bot);
  if (!isIaMoveDone) return;

  triggerBoardReactivity();
}

export default function (props: PiecePosType) {
  function fillColor() {
    return boardState().board[props.row][props.column];
  }
  function isBlinking() {
    return boardState().winningPieces.find(
      (piece) => piece.column == props.column && piece.row == props.row
    )
      ? true
      : false;
  }

  return (
    <svg
      height="100"
      width="100"
      onClick={() =>
        actualPage() == PageEnum.local
          ? onclickLocal(props.column)
          : onClickIa(props.column)
      }
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
