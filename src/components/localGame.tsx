import GameContextRefactored, { turn, gameStep } from "./gameContextRefactored";
import PlayerTurnRefactored from "./playerTurnRefactored";
import BoardRefactored from "./boardRefactored";

export default function () {
  return (
    <GameContextRefactored>
      <PlayerTurnRefactored turn={turn()} gameStep={gameStep()} />
      <BoardRefactored />
    </GameContextRefactored>
  );
}
