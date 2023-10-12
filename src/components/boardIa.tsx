import { For, createSignal, onCleanup } from "solid-js";

import { Board } from "../entities/board.entity";
import BoardItemIa from "./boardItemIa";

export type PiecePosType = { row: number; column: number };

export const [boardState, setBoardState] = createSignal<Board>(new Board());

export default function () {
  onCleanup(() => setBoardState(new Board()));
  return (
    <div class="flex justify-center mt-5">
      <div class="grid grid-cols-7 bg-blue-800 border-4 border-r-black border-l-black border-b-black border-t-blue-900">
        <For each={boardState().rows}>
          {(row: number) => {
            return (
              <For each={boardState().columns}>
                {(column) => {
                  return <BoardItemIa row={row} column={column} />;
                }}
              </For>
            );
          }}
        </For>
      </div>
    </div>
  );
}
