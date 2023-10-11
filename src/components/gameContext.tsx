import { JSXElement, Show, createEffect, createSignal } from "solid-js";
import Overlay from "./overlay";
import {
  drawMessage,
  opponentLeftMessage,
  redWinMessage,
  waitingPLayer,
  yellowWinMessage,
} from "../languageDict";
import { gameLanguage } from "../App";

// TODO: Rename
export enum PieceEnum {
  red = "red",
  yellow = "yellow",
  empty = "white",
} // TODO: Add a "standby" step ? why ?
export enum GameStepEnum {
  playing,
  draw,
  win,
  opponentLeft,
  waiting,
}

export const [turn, setTurn] = createSignal(PieceEnum.red);
export const [gameStep, setGameStep] = createSignal(GameStepEnum.playing);
export const [messageToDisplay, setMessageToDisplay] = createSignal<string>();

export function switchTurn() {
  setTurn((prev) => (prev == PieceEnum.red ? PieceEnum.yellow : PieceEnum.red));
}

export default function (props: { children: JSXElement }) {
  // TODO: Mettre en place action quand win / null / nouvelle partie ici
  // ! Add case ia won => "You lose !"
  createEffect(() => {
    switch (gameStep()) {
      case GameStepEnum.draw:
        setMessageToDisplay(drawMessage[gameLanguage]);
        break;
      // TODO: Fix this case
      case GameStepEnum.win:
        setMessageToDisplay(
          turn() == PieceEnum.red
            ? redWinMessage[gameLanguage]
            : yellowWinMessage[gameLanguage]
        );
        break;
      case GameStepEnum.playing:
        setMessageToDisplay();
        break;
      case GameStepEnum.opponentLeft:
        setMessageToDisplay(opponentLeftMessage[gameLanguage]);
        break;
      case GameStepEnum.waiting:
        setMessageToDisplay(waitingPLayer[gameLanguage]);
      default:
        console.log("gameStep() case error");
    }
  });
  return (
    <>
      <Show when={messageToDisplay()}>
        <Overlay message={messageToDisplay() as string} />
      </Show>
      {props.children}
    </>
  );
}
