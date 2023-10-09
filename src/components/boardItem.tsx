import { createEffect, createSignal } from "solid-js"

import { GameStepEnum, PieceEnum, gameStep, setGameStep, setTurn, switchTurn, turn } from "./gameContext"
import { boardState, columns, rows, setWinningPieces, updateBoard, winningPieces } from "./board"
import { PageEnum, actualPage } from "../App"

import { checkNull, checkWinGlobal } from "../winDetection.utils"
import { playerPieceColor } from "./onlineGame"

import "./boardItem.css"
import { formatBoardForIA } from "../ia/ia.utils"
import { bot } from "./localGame"

type BoardItemProps = {
    row: number,
    column: number
}
type PlayerMoveType = {
    row: number,
    column: number
}

export const [playerMove, setPlayerMove] = createSignal<PlayerMoveType>()

// TODO: Move
function isMoveLegal(page: PageEnum, row: number, column: number) {
    // let moveIsLegal: boolean;
    console.log(0)
    // ! Adapt for ia
    if (page == PageEnum.online) {
        console.log(1)
        // Check if it's player's turn
        if (turn() != playerPieceColor()) return false
    }
    // TODO: Empecher le joueur de spam pour jouer pls fois !
    // if (page == PageEnum.ia) {
        // console.log(2)

        // Check if it's player's turn
        // ! Necessaire ?? Reponse ia instantanée ?
        // if (turn() != PieceEnum.red) return false // ! For now ia is always yellow
    // }
    // Check if case is empty
    // if (boardState()[row][column] != PieceEnum.empty
    //     // Check if the case is the last empty of the column 
    //     && row == 5 || boardState()[row + 1][column] != PieceEnum.empty) return true
    // else return false
    // Check case exists
    console.log(row, column);
    
    if (row > 5 || row < 0 || column > 6 || column < 0) return false // ! Clean

    // Check if case is empty
    console.log("boardState()[row][column]", boardState()[row][column])
    if (boardState()[row][column] == PieceEnum.empty) {
        console.log(3)

        if (row == 5) return true
        else if (boardState()[row + 1][column] != PieceEnum.empty) return true
    }
    console.log(4)
    return false // !
}

function onclickLocal(row:number, column: number) {
    // If spot already taken
    // if (boardState()[row][column] != PieceEnum.empty) return;
    
    // TODO: Change to be able to click on the whole column
    // if (row == 5 || boardState()[row + 1][column] != PieceEnum.empty) {
    if (!isMoveLegal(actualPage(), row, column)) return;
    console.log("move is legal")
    // Update board
    updateBoard(row, column)
    
    // ! get IA move
    const iaFormatedBoard = formatBoardForIA(boardState())
    console.log("iaFormatedBoard", iaFormatedBoard)
    const output = bot.activate(iaFormatedBoard)   
    console.log("model output", output)
    
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
    // if (turn() != playerPieceColor()) return;
    // if (boardState()[row][column] != PieceEnum.empty) return;

    // TODO: Change to be able to click on the whole column
    // if (row == 5 || boardState()[row + 1][column] != PieceEnum.empty) {
    if (!isMoveLegal(actualPage(), row, column)) return;

    setPlayerMove({row, column})
    // }
}

function iaMove(modelOutput: number[]) {
    const iaColumnMoves = [...modelOutput].sort((a, b) => b - a) // Sort desc
    console.log("=======> ordered list", iaColumnMoves)
    for (const pred of iaColumnMoves) {

        // const iaColumnMove = modelOutput.indexOf(Math.max(...modelOutput)) // ! Use order instead, to take second,... move
        // console.log("iaColumnMove", iaColumnMove)
        const iaColumnMove = modelOutput.indexOf(pred) // ! If two exact preds ??
        console.log("=========>", iaColumnMove)

        let iaRowMove: number = -1 // !
        // let iaRowMove: number;
        for (const row of [...rows].reverse()) {
            console.log("boardState()[row][iaColumnMove]=>", boardState()[row][iaColumnMove]);
            
            if (boardState()[row][iaColumnMove] == PieceEnum.empty) {
                console.log("row" + row + "checked");
                
                iaRowMove = row
                break
            }
        }
        // ! Check if the move is legal, if not loop and take the second predicted move !
        if (isMoveLegal(actualPage(), iaRowMove, iaColumnMove)) return {iaRowMove, iaColumnMove}
    }
    return {iaRowMove: -1,iaColumnMove: -1} // ! Clean that !!! (case no legal move !)
}

// ! Gérer les cas de victoires / null
function onClickIa(row:number, column: number) {
    console.log("onClickIa");
    
    if (!isMoveLegal(actualPage(), row, column)) return;

    updateBoard(row, column)
    // TODO: checkSituation() here

    // ! get IA move
    const iaFormatedBoard = formatBoardForIA(boardState())
    const output = bot.activate(iaFormatedBoard)   
    // console.log("iaFormatedBoard", iaFormatedBoard)
    console.log("model output", output)
    const {iaRowMove, iaColumnMove} = iaMove(output)

    console.log("iaColumnMove", iaColumnMove)
    console.log("iaRowMove", iaRowMove)
    switchTurn() // ! remove when checkSituation is used
    updateBoard(iaRowMove, iaColumnMove)
    // TODO: checkSituation() here


    // TODO: Refactor checkWinGlobal with checkNull => checkSituation()
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
        // <svg height="100" width="100" onClick={() => actualPage() == PageEnum.local
        //     ? onclickLocal(props.row, props.column)
        //     : onClickOnline(props.row, props.column)}
        // >
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