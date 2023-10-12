import { turn } from "./gameContextLocal";
import { boardState, setBoardState, PiecePosType } from "./boardLocal";

import "./boardItem.css";

// TODO: Find a cleaner way to do it, is the old class still in memory ?
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
    <svg height="100" width="100" onClick={() => onclickLocal(props.column)}>
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
