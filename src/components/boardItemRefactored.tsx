import { PieceEnum, turn } from "./gameContextRefactored";
import { PiecePosType, boardState, setBoardState } from "./boardRefactored";
import { bot } from "./iaGame";

import { PageEnum, actualPage } from "../App";
import "./boardItem.css";
import { setPlayerMoveMedium } from "./iaGameMedium";
import { aiDifficultyLevel } from "./menu";

export function triggerBoardReactivity() {
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

function onClickIaMedium(column: number) {
  // Player move
  const isPlayerMoveLegal = boardState().move(PieceEnum.red, column);
  if (!isPlayerMoveLegal) return;

  triggerBoardReactivity();

  // AI move
  setPlayerMoveMedium({
    matrixBoard: boardState().getMatrixFormatedBoard(),
    depth: String(aiDifficultyLevel()),
    maximizingPlayer: false,
  });
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
      onClick={() => {
        switch (actualPage()) {
          case PageEnum.local:
            onclickLocal(props.column);
            break;
          case PageEnum.ia:
            onClickIaMedium(props.column);
            break;
        }
      }}
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
