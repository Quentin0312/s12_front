import GameContextRefactored, { PieceEnum } from "./gameContextRefactored";
import { setPlayerPieceColor } from "./onlineGame";
import BoardRefactored, { boardState } from "./boardRefactored";
import { createEffect, createSignal, on } from "solid-js";
import { triggerBoardReactivity } from "./boardItemRefactored";

type PlayerMoveType = {
  matrixBoard: number[][];
  depth: string;
  maximizingPlayer: boolean;
};
export const [playerMoveMedium, setPlayerMoveMedium] =
  createSignal<PlayerMoveType>();

export default function () {
  // ------------- Preuve que ia_alphabeta_js fonctionne --------------
  // const iaWorker = new Worker("/src/ia_alphabeta_js/minimax.js");
  // iaWorker.addEventListener(
  //   "message",
  //   function handler(e) {
  //     const bestMove = e.data;
  //     console.log(bestMove);
  //   },
  //   false
  // );
  // const workerParams = {
  //   matrixBoard: [
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 1, 0, 0, 0],
  //   ],
  //   depth: "4", // ! params to modify to change difficulty !
  //   maximizingPlayer: false,
  // };
  // iaWorker.postMessage(JSON.stringify(workerParams));
  // ------------- Preuve que ia_alphabeta_js fonctionne --------------
  const iaWorker = new Worker("/src/ia_alphabeta_js/minimax.js");
  iaWorker.addEventListener(
    "message",
    function handler(e) {
      const bestMove: { columnMove: number; score: number } = e.data;
      console.log("ia bestMove => ", bestMove);
      // enregistrer move de l'ia dans le board
      boardState().move(PieceEnum.yellow, bestMove.columnMove);
      // et triggerReactivity !
      triggerBoardReactivity();
    },
    false
  );

  createEffect(
    on(playerMoveMedium, () => {
      if (playerMoveMedium()) {
        iaWorker.postMessage(JSON.stringify(playerMoveMedium()));
      }
    })
  );

  setPlayerPieceColor(PieceEnum.red);
  return (
    <GameContextRefactored>
      <BoardRefactored />
    </GameContextRefactored>
  );
}
