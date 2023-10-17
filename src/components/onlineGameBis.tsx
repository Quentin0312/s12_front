// TODO: refactor with / use board.tsx
import { io } from "socket.io-client";
import GameContext, {
  GameStepEnum,
  PieceEnum,
  gameStep,
  setGameStep,
  turn,
} from "./gameContext";
import { createSignal, onCleanup } from "solid-js";
import Board, { getInitialBoard, setBoardState } from "./board";
import { setPlayerMove } from "./boardItem";
import PlayerTurn from "./playerTurn";
import WebSocket from "./webSocket";

// TODO: Move cause also use in iaGame
// TODO En faire un Signal dérivé ?
export const [playerPieceColor, setPlayerPieceColor] =
  createSignal<PieceEnum>();

export default function () {
  setGameStep(GameStepEnum.waiting);
  // TODO: Put url in .env
  const socket = io(
    import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://s12-back-bf7d3c384d86.herokuapp.com/"
  );
  // TODO: if socket.active est false donc GamestepEnum.bug à mettre en place
  // ! et ses conséquences et actions

  onCleanup(() => {
    // TODO: Check if working properly
    setBoardState(getInitialBoard());
    setPlayerMove();
    setPlayerPieceColor();
  });
  return (
    <GameContext>
      <WebSocket socket={socket} />
      <PlayerTurn turn={turn()} gameStep={gameStep()} />
      <Board />
    </GameContext>
  );
}
