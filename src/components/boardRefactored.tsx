import { For, Show, createSignal, onCleanup } from "solid-js";

import { Board } from "../entities/board.entity";
import BoardItem from "./boardItemRefactored";
import { PageEnum, actualPage, gameLanguage } from "../App";
import { difficultyLevel, easy, hard, medium, veryHard } from "../languageDict";
import { DifficultyLevelEnum, aiDifficultyLevel } from "./menu";

export type PiecePosType = { row: number; column: number };

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

export const [boardState, setBoardState] = createSignal<Board>(new Board());

export default function () {
  if (window.innerWidth < 640) {
    setDimBoard({ r: 20, cy: 25, cx: 25, h: 50, w: 50 });
  }
  onCleanup(() => setBoardState(new Board()));

  function levelToDisplay() {
    const message = difficultyLevel[gameLanguage()];
    if (actualPage() == PageEnum.ia) {
      switch (aiDifficultyLevel()) {
        case DifficultyLevelEnum.easy:
          return message + easy[gameLanguage()];
        case DifficultyLevelEnum.medium:
          return message + medium[gameLanguage()];
        case DifficultyLevelEnum.hard:
          return message + hard[gameLanguage()];
        case DifficultyLevelEnum.veryHard:
          return message + veryHard[gameLanguage()];
        default:
          return "";
      }
    } else return "";
  }
  return (
    <>
      <Show when={actualPage() == PageEnum.ia}>
        <div>{levelToDisplay()}</div>
      </Show>
      <div class="flex justify-center mt-5">
        <div class="grid grid-cols-7 bg-blue-800 border-4 border-r-black border-l-black border-b-black border-t-blue-900">
          <For each={boardState().rows}>
            {(row: number) => {
              return (
                <For each={boardState().columns}>
                  {(column) => {
                    return <BoardItem row={row} column={column} />;
                  }}
                </For>
              );
            }}
          </For>
        </div>
      </div>
    </>
  );
}
