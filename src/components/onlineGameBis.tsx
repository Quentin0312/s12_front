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
import Chat from "./Chat";
import { setPrivateGameCode, setPrivateGameMode } from "./menu";

// TODO: Move cause also use in iaGame
// TODO En faire un Signal dérivé ?
export const [playerPieceColor, setPlayerPieceColor] =
  createSignal<PieceEnum>();

// Timer des joueurs
export const [timerRed, setTimerRed] = createSignal("0:00");
export const [timerYellow, setTimerYellow] = createSignal("0:00");

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
    setPrivateGameCode();
    setPrivateGameMode(false);
    setPlayerMove();
    setPlayerPieceColor();
    setTimerRed("0:00");
    setTimerYellow("0:00");
  });
  return (
    <>
      <div class="flex justify-center items-center w-screen space-x-3 p-2">
        <span class="countdown font-mono text-2xl">{timerRed()}</span>
        <div class="w-12 h-12 bg-red-600 rounded-full" />
        <div class="w-12 h-12 bg-yellow-400 rounded-full" />
        <span class="countdown font-mono text-2xl">{timerYellow()}</span>
      </div>
      <GameContext>
        <WebSocket socket={socket} />
        <PlayerTurn turn={turn()} gameStep={gameStep()} />
        <Board />
        <Chat socket={socket} />
      </GameContext>
    </>
  );
}
