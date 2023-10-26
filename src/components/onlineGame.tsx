// TODO: refactor with / use board.tsx
import { io } from "socket.io-client";
import GameContext, {
  GameStepEnum,
  PieceEnum,
  gameStep,
  setGameStep,
  setOnlineGameWinner,
  switchTurn,
  turn,
} from "./gameContext";
import { createEffect, createSignal, onCleanup } from "solid-js";
import Board, {
  WinningPiecesType,
  boardStateDictType,
  getInitialBoard,
  setBoardState,
  setWinningPieces,
} from "./board";
import { playerMove, setPlayerMove } from "./boardItem";
import PlayerTurn from "./playerTurn";

// TODO: Move cause also use in iaGame
export const [playerPieceColor, setPlayerPieceColor] =
  createSignal<PieceEnum>();

// TODO: Don't use GameStepEnum but a specific one ?
type WinningRequestType = {
  result: GameStepEnum;
  board: boardStateDictType;
  winningPieces?: WinningPiecesType;
  winner: PieceEnum;
};

type TimerInfos = {
  currentTime: string;
  playerPiece: string;
};

// ! ------------------CAREFUL-----------------
// In this file socket.on don't used
// ! ------------------CAREFUL-----------------

export default function () {
  setGameStep(GameStepEnum.waiting);
  // TODO: Put url in .env
  const socket = io(
    import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://s12-back-bf7d3c384d86.herokuapp.com/"
  );
  // TODO: if socket.active est false donc GamestepEnum.bug à mettre en place
  // et ses conséquences et actions

  const [timerRed, setTimerRed] = createSignal("0:00");
  const [timerYellow, setTimerYellow] = createSignal("0:00");

  // player color
  socket.on("player color", (req: PieceEnum.red | PieceEnum.yellow) => {
    console.log(req);
    setPlayerPieceColor(req == "red" ? PieceEnum.red : PieceEnum.yellow);
    if (req == "yellow") {
      // setGameStep(GameStepEnum.waiting)
      socket.on("opponent ready", () => {
        setGameStep(GameStepEnum.playing);
      });
    } else {
      setGameStep(GameStepEnum.playing);
      console.log("red so opponent is already ready");
    }
  });

  socket.on("disconnection order", () => {
    setGameStep(GameStepEnum.opponentLeft);
    socket.disconnect();
  });

  createEffect(() => {
    const move = playerMove();
    if (!move) return;
    socket.emit("move", move);
  });

  // TODO: Check these ones works properly
  socket.on("moved", (req: boardStateDictType) => {
    switchTurn();
    setBoardState(req);
  });
  socket.on("game result", (req: WinningRequestType) => {
    console.log("req.winner", req.winner);
    setOnlineGameWinner(req.winner);
    setBoardState(req.board);
    if (req.winningPieces) {
      setWinningPieces(req.winningPieces);
    }
    setGameStep(req.result);
    socket.disconnect();
  });

  socket.on("timer", (req: TimerInfos) => {
    req.playerPiece == PieceEnum.red
      ? setTimerRed(req.currentTime)
      : setTimerYellow(req.currentTime);
  });

  onCleanup(() => {
    // TODO: Check if working properly
    socket.disconnect();
    setBoardState(getInitialBoard());
    setPlayerMove();
    setPlayerPieceColor();
  });

  return (
    <>
      <GameContext>
        <PlayerTurn turn={turn()} gameStep={gameStep()} />
        <Board />
      </GameContext>
      <div>
        <p> Rouge </p>
        <p id="timerDisplayRed"> {timerRed()} </p>
        <p> Jaune </p>
        <p id="timerDisplayYellow"> {timerYellow()} </p>
      </div>
    </>
  );
}
