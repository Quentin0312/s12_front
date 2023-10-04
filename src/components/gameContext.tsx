import { JSXElement, Show, createEffect, createSignal } from "solid-js";
import Overlay from "./overlay";
import { drawMessage, winMessage } from "../languageDict";
import { gameLanguage } from "../App";

// TODO: Rename
export enum PieceEnum {
    red="red",
    yellow="yellow",
    empty="white"
}// TODO: Add a "standby" step ? why ?
export enum GameStepEnum {
    playing,
    draw,
    win,
    opponentLeft,
}

export const [turn, setTurn] = createSignal(PieceEnum.red)
export const [gameStep, setGameStep] = createSignal(GameStepEnum.playing)
const [messageToDisplay, setMessageToDisplay] = createSignal<string>()

export function switchTurn() {
    setTurn((prev) =>
        prev == PieceEnum.red ? PieceEnum.yellow : PieceEnum.red
    )
}

export default function (props: {children: JSXElement}) {
    // TODO: Mettre en place action quand win / null / nouvelle partie ici
    createEffect(()=> {
        switch (gameStep()) {
            case GameStepEnum.draw:
                setMessageToDisplay(drawMessage[gameLanguage])
                break;
            case GameStepEnum.win:
                setMessageToDisplay(turn() + " " + winMessage[gameLanguage])
                break;
            case GameStepEnum.playing:
                setMessageToDisplay()
                break;
            default:
                console.log("gameStep() case error")
        }
    })
    return (
        <> 
            <Show when={messageToDisplay()}>
                <Overlay message={messageToDisplay() as string}/>
            </Show>
            {props.children}
        </>
    )

}