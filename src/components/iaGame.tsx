import Board from "./board";
import GameContext from "./gameContext";

export default function () {
    return (
        <GameContext>
            <Board />
        </GameContext>
    )
}