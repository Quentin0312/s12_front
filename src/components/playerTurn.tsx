import { Show } from "solid-js";

import { PageEnum, actualPage, gameLanguage } from "../App";
import { GameStepEnum, PieceEnum } from "./gameContext";

import { playerPieceColor } from "./onlineGameBis";

import {
  opponentTurnMessageLanguageDictType,
  playerRedTurn,
  playerYellowTurn,
  yourTurnMessageLanguageDictType,
} from "../languageDict";
import "./playerTurn.css";

export default function (props: { turn: PieceEnum; gameStep: GameStepEnum }) {
  const color = () => (props.turn == PieceEnum.red ? "red" : "yellow");

  const messageToDisplay = () => {
    switch (actualPage()) {
      case PageEnum.local:
        if (props.turn == PieceEnum.red) return playerRedTurn[gameLanguage];
        else return playerYellowTurn[gameLanguage];

      case PageEnum.online:
        if (props.turn == playerPieceColor())
          return yourTurnMessageLanguageDictType[gameLanguage];
        else return opponentTurnMessageLanguageDictType[gameLanguage];

      default:
        console.log("switch case error; messageToDisplay()");
        break;
    }
  };

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
