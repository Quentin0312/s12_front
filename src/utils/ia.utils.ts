import { PiecePosType, boardState, boardStateDictType, rows } from "../components/board";
import { PieceEnum } from "../components/gameContext";
import { bot } from "../components/iaGame";
import { isMoveLegal } from "./game.utils";

// TODO: Remplacer IA par AI

function formatBoardForIA(board: boardStateDictType) {
    const iaFormatedBoard: number[] = []
    // ! Careful => here red is local player and yellow is the bot
    for (let i = 0; i < 6; i++) {
        for (const piece of board[i]) {
            iaFormatedBoard.push(piece == PieceEnum.empty ? 0
                : piece == PieceEnum.red ? -1 : 1)
        }
    }
    return iaFormatedBoard
}

// ! Carefull, return PiecePosType with row:-1 if move is not legal !
function getIaMoves(): PiecePosType[] {
    const iaFormatedBoard = formatBoardForIA(boardState())
    const modelRawResult = bot.activate(iaFormatedBoard)
    console.log("modelRawResult", modelRawResult);
    

    let iaMoves: PiecePosType[] = []

    const iaColumnMoves = [...modelRawResult].sort((a, b) => b - a)
    for (const pred of iaColumnMoves) {
        const iaColumnMove = modelRawResult.indexOf(pred)
        let iaRowMove: number = -1 // !

        for (const row of [...rows].reverse()) {
            
            if (boardState()[row][iaColumnMove] == PieceEnum.empty) {
                
                iaRowMove = row
                break
            }
        }
        iaMoves.push({row: iaRowMove, column: iaColumnMove})
    }
    return iaMoves
}

export function getBestIaLegalMove() {
    const iaMoves = getIaMoves()

    for (const move of iaMoves) {
        // ! Carefull, in next line raw 'PieceEnum.yellow' correspond to the
        // ! fact that the ai is always the yellow player
        if (isMoveLegal(move.row, move.column, PieceEnum.yellow)) return move
    }    
}