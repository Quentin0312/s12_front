import { boardStateDictType } from "../components/board";
import { PieceEnum } from "../components/gameContext";

export function formatBoardForIA(board: boardStateDictType) {
    const iaFormatedBoard: number[] = []
    // ! Careful => here red is local player and yellow is the bot
    for (let i = 0; i < 6; i++) {
        // const row: number[] = []
        for (const piece of board[i]) {
            iaFormatedBoard.push(piece == PieceEnum.empty ? 0
                : piece == PieceEnum.red ? -1 : 1)
        }
        // iaFormatedBoard.push(row)
    }
    return iaFormatedBoard
}