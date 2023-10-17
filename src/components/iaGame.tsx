import { Network } from "synaptic";

import GameContextRefactored, { PieceEnum } from "./gameContextRefactored";
import { setPlayerPieceColor } from "./onlineGame";
import BoardRefactored from "./boardRefactored";

import networkWeights from "../ia/networkWeights.json";

export const bot = Network.fromJSON(networkWeights);

export default function () {
  setPlayerPieceColor(PieceEnum.red);
  return (
    <GameContextRefactored>
      <BoardRefactored />
    </GameContextRefactored>
  );
}
