import { Network } from "synaptic";

import GameContextRefactored, { PieceEnum } from "./gameContextRefactored";
import { setPlayerPieceColor } from "./onlineGame";
import BoardRefactored from "./boardRefactored";

import networkWeights from "../ia/networkWeights.json";

export const bot = Network.fromJSON(networkWeights);

export default function () {
  // ------------- Preuve que ia_alphabeta_js fonctionne --------------
  const iaWorker = new Worker("/src/ia_alphabeta_js/minimax.js");
  iaWorker.addEventListener(
    "message",
    function handler(e) {
      const bestMove = e.data;
      console.log(bestMove);
    },
    false
  );
  const workerParams = {
    matrixBoard: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ],
    depth: "4", // ! params to modify to change difficulty !
    maximizingPlayer: false,
  };
  iaWorker.postMessage(JSON.stringify(workerParams));
  // ------------- Preuve que ia_alphabeta_js fonctionne --------------

  setPlayerPieceColor(PieceEnum.red);
  return (
    <GameContextRefactored>
      <BoardRefactored />
    </GameContextRefactored>
  );
}
