import { Network } from "synaptic";

import GameContextIa, { PieceEnum } from "./gameContextIa";
import { setPlayerPieceColor } from "./onlineGame";
import BoardIa from "./boardIa";

import networkWeights from "../ia/networkWeights.json";

export const bot = Network.fromJSON(networkWeights);

export default function () {
  setPlayerPieceColor(PieceEnum.red);
  return (
    <GameContextIa>
      <BoardIa />
    </GameContextIa>
  );
}
