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
    <>
    <div>
      <div class="dropdown">
        <label tabindex="0" class="btn btn-neutral m-1">Partie en ligne</label>
        <div tabindex="0" class="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content">
          <div class="card-body">
            <button class="btn btn-secondary">Recherche de joueur</button>
            <button class="btn btn-secondary">Créer</button>
            <button class="btn btn-secondary">Rejoindre</button>
            <div class="flex flex-col items-center">
              <input type="text" placeholder="Code" class="input input-bordered input-secondary w-2/3  max-w-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    // <div class="grid grid-cols-3 justify-center mt-10 h-40">
    //   <MenuButton
    //     title={gameModeLocal[gameLanguage]}
    //     onClick={() => setActualPage(PageEnum.local)}
    //   />
    //   <MenuButton
    //     title={gameModeOnline[gameLanguage]}
    //     onClick={() => setActualPage(PageEnum.online)}
    //   />
    //   <div>
    //     <label for="difficulty-level-select">
    //       {chooseDifficulty[gameLanguage]}
    //     </label>

    //     <select
    //       value={aiDifficultyLevel()}
    //       onChange={(e) => setAiDifficultyLevel(Number(e.target.value))}
    //       id="difficulty-level-select"
    //     >
    //       <option value={DifficultyLevelEnum.easy}>{easy[gameLanguage]}</option>
    //       <option value={DifficultyLevelEnum.medium}>
    //         {medium[gameLanguage]}
    //       </option>
    //       <option value={DifficultyLevelEnum.hard}>{hard[gameLanguage]}</option>
    //       <option value={DifficultyLevelEnum.veryHard}>
    //         {veryHard[gameLanguage]}
    //       </option>
    //     </select>
    //     <MenuButton
    //       title={gameModeIA[gameLanguage]}
    //       onClick={() => setActualPage(PageEnum.ia)}
    //     />
    //   </div>
    // </div>
  );
}
