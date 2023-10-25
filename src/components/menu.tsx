import { Show, createSignal } from "solid-js";
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

  const [inputValue, setInputValue] = createSignal("");
  const lengthCode = 12;
  const [showContentLigne, setShowContentLigne] = createSignal(false);
  const [showContentIA, setShowContentIA] = createSignal(false);

  return (
    <>
    <div class="flex flex-col md:flex-row justify-between w-full">
      {/* ====================== Local =========================== */}
      <div>
		  <button class="btn btn-neutral m-1 w-64"> Partie local </button>
	    </div>
      {/* ====================== En Ligne =========================== */}
	    <div>
		  <button class="btn btn-neutral m-1 w-64"
              onClick={() => setShowContentLigne(!showContentLigne())}>
                Partie en ligne
      </button>
      <Show when={showContentLigne()}> 
		  <div class="card card-compact w-64 p-2 shadow bg-primary text-primary-content">
			  <div class="card-body">
          <button class="btn btn-secondary">Recherche de joueur</button>
				  <button class="btn btn-secondary">Créer</button>
          <button class={`btn btn-secondary 
                            ${inputValue().length === lengthCode ? '' : 'bg-gray-400 cursor-not-allowed'}`} disabled={inputValue().length !== lengthCode}>
              Rejoindre
          </button>
          <div class="flex justify-center">
            <input type="text" placeholder="Code" 
                  class="input input-bordered input-secondary w-2/3 
                       text-black" maxlength={lengthCode}
                  onInput={(e) => setInputValue(e.target.value)}/>
          </div>
			  </div>
		  </div>
      </Show>
	    </div>
      {/* ====================== Contre l'IA =========================== */}
      <div>
        <button class="btn btn-neutral m-1 w-64"
                onClick={() => setShowContentIA(!showContentIA())}>
                  Partie contre l'IA
        </button>
        <Show when={showContentIA()}>
          <div class="card card-compact w-64 p-2 shadow bg-primary text-primary-content">
			      <div class="card-body">
              <button class="btn btn-secondary">Facile</button>
              <button class="btn btn-secondary">Moyen</button>
              <button class="btn btn-secondary">Difficile</button>
              <button class="btn btn-secondary">Très Difficile</button>
            </div>
          </div>
        </Show>
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
