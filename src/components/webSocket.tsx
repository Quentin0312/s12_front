// TODO: Ajouter docs précise dans le code !

import { Socket } from "socket.io-client";
import {
  GameStepEnum,
  PieceEnum,
  setGameStep,
  setOnlineGameWinner,
  switchTurn,
} from "./gameContext";
import {
  setPlayerPieceColor,
  setTimerRed,
  setTimerYellow,
} from "./onlineGameBis";
import { createEffect, onCleanup } from "solid-js";
import { playerMove } from "./boardItem";
import {
  WinningPiecesType,
  boardStateDictType,
  setBoardState,
  setWinningPieces,
} from "./board";

type TimerInfos = {
  currentTime: string;
  playerPiece: string;
};

// TODO: Don't use GameStepEnum but a specific one ?
type WinningRequestType = {
  result: GameStepEnum;
  board: boardStateDictType;
  winningPieces?: WinningPiecesType;
  winner: PieceEnum;
};

export default function (props: { socket: Socket }) {
  // -------------PLAYING-----------------
  props.socket.on("player color", (req: PieceEnum.red | PieceEnum.yellow) => {
    console.log(req);
    setPlayerPieceColor(req == "red" ? PieceEnum.red : PieceEnum.yellow);
    if (req == "yellow") {
      // setGameStep(GameStepEnum.waiting)
      props.socket.on("opponent ready", () => {
        setGameStep(GameStepEnum.playing);
      });
    } else {
      setGameStep(GameStepEnum.playing);
      console.log("red so opponent is already ready");
    }
  });

  createEffect(() => {
    const move = playerMove();
    if (!move) return;
    props.socket.emit("move", move);
  });

  props.socket.on("moved", (req: boardStateDictType) => {
    switchTurn();
    setBoardState(req);
  });
  props.socket.on("game result", (req: WinningRequestType) => {
    console.log("req.winner", req.winner);
    setOnlineGameWinner(req.winner);
    setBoardState(req.board);
    if (req.winningPieces) {
      setWinningPieces(req.winningPieces);
    }
    setGameStep(req.result);
    props.socket.disconnect();
  });

  // Mise à jour des timer
  props.socket.on("timer", (req: TimerInfos) => {
    req.playerPiece == PieceEnum.red
      ? setTimerRed(req.currentTime)
      : setTimerYellow(req.currentTime);
  });

  // -------------CONNECTION-----------------
  props.socket.on("disconnection order", () => {
    setGameStep(GameStepEnum.opponentLeft);
    props.socket.disconnect();
  });

  onCleanup(() => props.socket.disconnect());
  return <></>;
}
