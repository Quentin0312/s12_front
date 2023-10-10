import { createEffect, createSignal } from "solid-js"

import { PageEnum, actualPage } from "../App"
import { GameStepEnum, PieceEnum, gameStep, setGameStep, setTurn, switchTurn } from "./gameContext"
import { PiecePosType, boardState, setWinningPieces, updateBoard, winningPieces } from "./board"

import { checkWinGlobal } from "../utils/winDetection.utils"
import { playerPieceColor } from "./onlineGame"

import { checkNull, getSituation, isMoveLegal } from "../utils/game.utils"
import { getBestIaLegalMove } from "../utils/ia.utils"

import "./boardItem.css"

type BoardItemProps = {
    row: number,
    column: number
}
type PlayerMoveType = {
    row: number,
    column: number
}

export const [playerMove, setPlayerMove] = createSignal<PlayerMoveType>()

function onclickLocal(row:number, column: number) {
    // TODO: Change to be able to click on the whole column
    if (!isMoveLegal(row, column, playerPieceColor() as PieceEnum)) return;
    console.log("move is legal")
    // Update board
    updateBoard(row, column)
    
    // TODO: Refactor checkWinGlobal with checkNull => checkSituation
    // Check win situations
    const totalWinningPieces = checkWinGlobal()
    if (totalWinningPieces.length > 0) {
        setGameStep(GameStepEnum.win)
        setWinningPieces(totalWinningPieces)

    // Check null situations
    } else if (checkNull()) {
        setGameStep(GameStepEnum.draw)
    }

    // Switch to other player
    if (gameStep() == GameStepEnum.playing) {
        switchTurn()
    } else {setTurn(PieceEnum.red)}

}

function onClickOnline(row:number, column: number) {
    // TODO: Change to be able to click on the whole column
    if (!isMoveLegal(row, column, playerPieceColor() as PieceEnum)) return;

    setPlayerMove({row, column})
}

// ! Refactor les step 1,2,3 & 4,5,6
function onClickIa(row:number, column: number) {
    console.log("onClickIa");
    
    // ! Step 1: Check if move is legal
    console.log("step 1");
    
    if (!isMoveLegal(row, column, playerPieceColor() as PieceEnum)) return; // TODO: Display Specific user message ?

    // ! Step 2: Update board
    updateBoard(row, column)

    // ! Step 3: Check situation
    // TODO: Refactor
    switch (getSituation()) {
        case GameStepEnum.win:
            setGameStep(GameStepEnum.win)
            setWinningPieces(checkWinGlobal())
            return;
        case GameStepEnum.draw:
            setGameStep(GameStepEnum.draw)
            return;
        case GameStepEnum.playing:
            switchTurn()
            break;
        default:
            console.log("switch situation error")
            break;
    }    

    // ! Step 4: Get a legal move of ai
    const bestIaLegalMove = getBestIaLegalMove() as PiecePosType
    console.log("bestIaLegalMove", bestIaLegalMove)
    
    // ! Step 5: Update board    
    updateBoard(bestIaLegalMove.row, bestIaLegalMove.column)

    // ! Step 6: Check situtation
    // TODO: Refactor
    switch (getSituation()) {
        case GameStepEnum.win:
            setGameStep(GameStepEnum.win)
            setWinningPieces(checkWinGlobal())
            return;
        case GameStepEnum.draw:
            setGameStep(GameStepEnum.draw)
            return;
        case GameStepEnum.playing:
            switchTurn()
            break;
        default:
            console.log("switch situation error")
            break;
    }
}

export default function (props: BoardItemProps) {
    const [fillColor, setFillColor] = createSignal<PieceEnum>(PieceEnum.empty)
    const [isBlinking, setIsBlinking] = createSignal(false)
    
    createEffect(()=> {
        setFillColor(boardState()[props.row][props.column])
    })

    createEffect(() => {        
        if (winningPieces().filter((piece) => piece.column == props.column && piece.row == props.row).length > 0) {
            setIsBlinking(true)
        } else {setIsBlinking((prev) => prev ? false : prev )}
    })

    return (
        <svg height="100" width="100" onClick={() => actualPage() == PageEnum.local
            ? onclickLocal(props.row, props.column)
            : actualPage() == PageEnum.online
                ? onClickOnline(props.row, props.column)
                : onClickIa(props.row, props.column)}
        >
            <circle class={isBlinking() ? "blink": ""} cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill={fillColor()} />
        </svg>
    )
}