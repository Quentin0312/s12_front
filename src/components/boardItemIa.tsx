import { PieceEnum } from "./gameContextIa";
import { PiecePosType, boardState, setBoardState } from "./boardIa";
import { bot } from "./iaGame";

import "./boardItem.css";

function triggerBoardReactivity() {
  setBoardState((prev) => {
    return prev.getCopy();
  });
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
    <svg height="100" width="100" onClick={() => onClickIa(props.column)}>
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
