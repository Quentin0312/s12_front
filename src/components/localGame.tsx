import GameContextLocal, { turn, gameStep } from "./gameContextLocal";
import PlayerTurn from "./playerTurn";
import BoardLocal from "./boardLocal";

export default function () {
  return (
    <GameContextLocal>
      <PlayerTurn turn={turn()} gameStep={gameStep()} />
      <BoardLocal />
    </GameContextLocal>
  );
}
