import { createSignal } from "solid-js";
import { PageEnum, gameLanguage, setActualPage } from "../App";
import {
  chooseDifficulty,
  easy,
  gameModeIA,
  gameModeLocal,
  gameModeOnline,
  hard,
  medium,
  veryHard,
} from "../languageDict";
import MenuButton from "./menuButton";

export enum DifficultyLevelEnum {
  easy = 2,
  medium = 4,
  hard = 6,
  veryHard = 8,
}

export const [aiDifficultyLevel, setAiDifficultyLevel] = createSignal(
  DifficultyLevelEnum.easy
);

export default function () {
  return (
    <div class="grid grid-cols-3 justify-center mt-10 h-40">
      <MenuButton
        title={gameModeLocal[gameLanguage]}
        onClick={() => setActualPage(PageEnum.local)}
      />
      <MenuButton
        title={gameModeOnline[gameLanguage]}
        onClick={() => setActualPage(PageEnum.online)}
      />
      <div>
        <label for="difficulty-level-select">
          {chooseDifficulty[gameLanguage]}
        </label>

        <select
          value={aiDifficultyLevel()}
          onChange={(e) => setAiDifficultyLevel(Number(e.target.value))}
          id="difficulty-level-select"
        >
          <option value={DifficultyLevelEnum.easy}>{easy[gameLanguage]}</option>
          <option value={DifficultyLevelEnum.medium}>
            {medium[gameLanguage]}
          </option>
          <option value={DifficultyLevelEnum.hard}>{hard[gameLanguage]}</option>
          <option value={DifficultyLevelEnum.veryHard}>
            {veryHard[gameLanguage]}
          </option>
        </select>
        <MenuButton
          title={gameModeIA[gameLanguage]}
          onClick={() => setActualPage(PageEnum.ia)}
        />
      </div>
    </div>
  );
}
