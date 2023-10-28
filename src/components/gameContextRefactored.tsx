import { JSXElement, Show } from "solid-js";

import { gameLanguage } from "../App";
import Overlay from "./overlay";
import { boardState } from "./boardRefactored";
import { drawMessage, redWinMessage, yellowWinMessage } from "../languageDict";

export enum GameStepEnum {
  playing,
  draw,
  win,
  opponentLeft,
  waiting,
}
export enum PieceEnum {
  red = "red",
  yellow = "yellow",
  empty = "white",
}

export function turn(): PieceEnum {
  return boardState().turn;
}
export function gameStep(): GameStepEnum {
  return boardState().situation;
}
export function messageToDisplay(): string | undefined {
  switch (gameStep()) {
    case GameStepEnum.draw:
      return drawMessage[gameLanguage()];

    case GameStepEnum.win:
      return turn() == PieceEnum.red
        ? redWinMessage[gameLanguage()]
        : yellowWinMessage[gameLanguage()];

    case GameStepEnum.playing:
      return;

    default:
      console.log("gameStep switch case error");
      break;
  }
}

export default function (props: { children: JSXElement }) {
  return (
    <>
      <Show when={messageToDisplay()}>
        <Overlay message={messageToDisplay() as string} />
      </Show>
      {props.children}
    </>
  );
}
