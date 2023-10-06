import Board from "./board";
import GameContext from "./gameContext";
import PlayerTurn from "./playerTurn";

import networkWeights from '../ia/networkWeights.json';

import { Network } from "synaptic"

export const bot = Network.fromJSON(networkWeights)

export default function () {
    return (
        <GameContext>
            <PlayerTurn />
            <Board />
        </GameContext>
    )
}