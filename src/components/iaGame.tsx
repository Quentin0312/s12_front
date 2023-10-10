import { Network } from "synaptic"
import Board from "./board";
import GameContext, { PieceEnum } from "./gameContext";

import networkWeights from '../ia/networkWeights.json';
import { setPlayerPieceColor } from "./onlineGame";
export const bot = Network.fromJSON(networkWeights)

export default function () {
    setPlayerPieceColor(PieceEnum.red)
    return (
        <GameContext>
            <Board />
        </GameContext>
    )
}