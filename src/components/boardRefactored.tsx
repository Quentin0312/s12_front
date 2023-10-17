import { For, Show, createSignal, onCleanup } from "solid-js";

import { Board } from "../entities/board.entity";
import BoardItem from "./boardItemRefactored";
import { PageEnum, actualPage, gameLanguage } from "../App";
import { difficultyLevel, easy, hard, medium, veryHard } from "../languageDict";
import { DifficultyLevelEnum, aiDifficultyLevel } from "./menu";

export type PiecePosType = { row: number; column: number };

export const [boardState, setBoardState] = createSignal<Board>(new Board());

export default function () {
  onCleanup(() => setBoardState(new Board()));

  function levelToDisplay() {
    const message = difficultyLevel[gameLanguage];
    if (actualPage() == PageEnum.ia) {
      switch (aiDifficultyLevel()) {
        case DifficultyLevelEnum.easy:
          return message + easy[gameLanguage];
        case DifficultyLevelEnum.medium:
          return message + medium[gameLanguage];
        case DifficultyLevelEnum.hard:
          return message + hard[gameLanguage];
        case DifficultyLevelEnum.veryHard:
          return message + veryHard[gameLanguage];
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
