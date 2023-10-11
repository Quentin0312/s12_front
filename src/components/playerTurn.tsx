import { Show } from "solid-js";

import { PageEnum, actualPage, gameLanguage } from "../App";
import {
  opponentTurnMessageLanguageDictType,
  playerRedTurn,
  playerYellowTurn,
  yourTurnMessageLanguageDictType,
} from "../languageDict";
import { GameStepEnum, PieceEnum, gameStep, turn } from "./gameContext";
import { playerPieceColor } from "./onlineGame";

import "./playerTurn.css";

export default function () {
  const color = () => (turn() == PieceEnum.red ? "red" : "yellow");
  const messageToDisplay = () =>
    actualPage() == PageEnum.local
      ? turn() == PieceEnum.red
        ? playerRedTurn[gameLanguage]
        : playerYellowTurn[gameLanguage]
      : turn() == playerPieceColor()
      ? yourTurnMessageLanguageDictType[gameLanguage]
      : opponentTurnMessageLanguageDictType[gameLanguage];

  return (
    <Show
      when={
        actualPage() == PageEnum.local ||
        (actualPage() == PageEnum.online && gameStep() == GameStepEnum.playing)
      }
    >
      <div
        id="player turn"
        class={`select-none text-center text-${
          turn() == PieceEnum.red ? "white" : "black"
        } white w-full h-5 turn-${color()}`}
      >
        {messageToDisplay()}
      </div>
    </Show>
  );
}
