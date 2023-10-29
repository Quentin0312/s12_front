import { For, createSignal } from "solid-js";
import BoardItem from "./boardItem";
import { turn } from "./gameContext";

enum PieceEnum {
  red = "red",
  yellow = "yellow",
  empty = "white",
}

type DimBoard = {
  r: number;
  cy: number;
  cx: number;
  h: number;
  w: number;
};

export const [dimBoard, setDimBoard] = createSignal<DimBoard>({
  r: 40,
  cy: 50,
  cx: 50,
  h: 100,
  w: 100,
});

export type boardStateDictType = { [key: number]: PieceEnum[] };
// TODO: Use PieceType[] instead and delete WinningPiecesType
export type WinningPiecesType = PiecePosType[];
// TODO: Use it always if posssible => ex: isMoveLegal parameter !
export type PiecePosType = { row: number; column: number };

export const rows = [0, 1, 2, 3, 4, 5];
export const columns = [0, 1, 2, 3, 4, 5, 6];

// TODO: Mettre en place une classe Board, ex: Board.reset(), Board.redMoves({row: 2, column: 0}), Board.get(), Board.getSituation(), Board.formatForIa()

export function getInitialBoard() {
  const initialBoardStateDict: boardStateDictType = {};

  for (const row of rows) {
    initialBoardStateDict[row] = Array(7).fill(PieceEnum.empty);
  }
  return initialBoardStateDict;
}

export const [boardState, setBoardState] = createSignal<boardStateDictType>(
  getInitialBoard()
);

export const [posLastPiece, setPosLastPiece] = createSignal<PiecePosType>({
  row: -1,
  column: -1,
});

export const [winningPieces, setWinningPieces] =
  createSignal<WinningPiecesType>([]);

export function updateBoard(row: number, column: number) {
  setBoardState((prev) => {
    const newDict = { ...prev };
    newDict[row][column] = turn();
    return newDict;
  });
}

/** Compare le plateau avant et après qu'un joueur est placé sa pièce pour
 * récupèrer la position de celle-ci. */
export function compareBoards(
  oldBoard: boardStateDictType,
  newBoard: boardStateDictType
) {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      if (oldBoard[i][j] !== newBoard[i][j]) {
        return { row: i, column: j };
      }
    }
  }
}

export default function () {
  if (window.innerWidth < 640) {
    setDimBoard({ r: 20, cy: 25, cx: 25, h: 50, w: 50 });
  }
  return (
    <div class="flex justify-center mt-5">
      <div class="grid grid-cols-7 bg-blue-800 border-4 border-r-black border-l-black border-b-black border-t-blue-900">
        <For each={rows}>
          {(row: number) => {
            return (
              <For each={columns}>
                {(column) => {
                  return <BoardItem row={row} column={column} />;
                }}
              </For>
            );
          }}
        </For>
      </div>
    </div>
  );
}
