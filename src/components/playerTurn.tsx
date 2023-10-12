import { Show } from "solid-js";

import { PageEnum, actualPage, gameLanguage } from "../App";
import { GameStepEnum, PieceEnum } from "./gameContext";

import { playerPieceColor } from "./onlineGame";

import {
  opponentTurnMessageLanguageDictType,
  playerRedTurn,
  playerYellowTurn,
  yourTurnMessageLanguageDictType,
} from "../languageDict";
import "./playerTurn.css";

export default function (props: { turn: PieceEnum; gameStep: GameStepEnum }) {
  const color = () => (props.turn == PieceEnum.red ? "red" : "yellow");
  const messageToDisplay = () =>
    actualPage() == PageEnum.local
      ? props.turn == PieceEnum.red
        ? playerRedTurn[gameLanguage]
        : playerYellowTurn[gameLanguage]
      : props.turn == playerPieceColor()
      ? yourTurnMessageLanguageDictType[gameLanguage]
      : opponentTurnMessageLanguageDictType[gameLanguage];

  return (
    <Show
      when={
        actualPage() == PageEnum.local || // TODO: && gameStep() != GameStepEnum.win)$ ?
        (actualPage() == PageEnum.online &&
          props.gameStep == GameStepEnum.playing)
      }
    >
      <div
        id="player turn"
        class={`select-none text-center text-${
          props.turn == PieceEnum.red ? "white" : "black"
        } white w-full h-5 turn-${color()}`}
      >
        {messageToDisplay()}
      </div>
    </Show>
  );
}
