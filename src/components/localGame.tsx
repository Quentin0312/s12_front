import Board from "./board";
import GameContext from "./gameContext";
import PlayerTurn from "./playerTurn";

export default function () {
    return (
        <GameContext>
            <PlayerTurn />
            <Board />
        </GameContext>
    )
}