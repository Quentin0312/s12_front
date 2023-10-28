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
import { createEffect, createSignal, onCleanup } from "solid-js";
import { playerMove } from "./boardItem";
import {
  WinningPiecesType,
  boardStateDictType,
  setBoardState,
  setWinningPieces,
} from "./board";
import { privateGameCode, privateGameMode, setPrivateGameCode } from "./menu";
import { PageEnum, setActualPage } from "../App";

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

export const [codeIsCorrect, setCodeIsCorrect] = createSignal(true);

export default function (props: { socket: Socket }) {
  // -------------PLAYING-----------------
  props.socket.on(
    "player color",
    (req: { color: PieceEnum.red | PieceEnum.yellow; code: string }) => {
      setPlayerPieceColor(
        req.color == "red" ? PieceEnum.red : PieceEnum.yellow
      );
      if (privateGameMode()) {
        setPrivateGameCode(req.code);
        console.log("code => ", req.code);
      }
      if (req.color == "yellow") {
        // setGameStep(GameStepEnum.waiting)
        props.socket.on("opponent ready", () => {
          setGameStep(GameStepEnum.playing);
        });
      } else {
        setGameStep(GameStepEnum.playing);
        console.log("red so opponent is already ready");
      }
    }
  );

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

  props.socket.on("is game private", () => {
    props.socket.emit("game is private", {
      isPrivate: privateGameMode(),
      code: privateGameCode(),
    });
  });

  // props.socket.on("incorrect code", () => {
  //   setActualPage((prev) => (prev == PageEnum.online ? PageEnum.menu : prev));
  //   setCodeIsCorrect(false);
  //   console.log("set to falzes => ", codeIsCorrect());
  //   console.log("incorect code ");
  // });

  onCleanup(() => props.socket.disconnect());
  return <></>;
}
