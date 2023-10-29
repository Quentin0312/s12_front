import { Show, createSignal, onCleanup, onMount } from "solid-js";
import { io } from "socket.io-client";
import { PageEnum, gameLanguage, setActualPage } from "../App";
import {
  chooseDifficulty,
  easy,
  gameModeIA,
  gameModeLocal,
  gameModeOnline,
  hard,
  joinPrivateGame,
  medium,
  privateGame,
  randomOpponent,
  veryHard,
} from "../languageDict";

import MenuButton from "./menuButton";
import SubMenuButton from "./subMenuButtons";

export enum DifficultyLevelEnum {
  easy = 2,
  medium = 4,
  hard = 6,
  veryHard = 8,
}

export const [aiDifficultyLevel, setAiDifficultyLevel] = createSignal(
  DifficultyLevelEnum.easy
);

export const [privateGameCode, setPrivateGameCode] = createSignal<string>();
export const [privateGameMode, setPrivateGameMode] = createSignal(false);

export default function () {
  const [inputValue, setInputValue] = createSignal("");
  const lengthCode = 5;
  const [showContentLigne, setShowContentLigne] = createSignal(false);
  const [showContentIA, setShowContentIA] = createSignal(false);

  const updateShowContent = () => {
    if (window.innerWidth >= 768) {
      // Taille d'écran pour md: selon Tailwind CSS
      setShowContentIA(true);
      setShowContentLigne(true);
    } else {
      setShowContentIA(false);
      setShowContentLigne(false);
    }
  };

  window.addEventListener("resize", updateShowContent);

  onMount(() => {
    updateShowContent();
  });

  onCleanup(() => {
    window.removeEventListener("resize", updateShowContent);
  });

  return (
    <>
      <div
        class="flex flex-col justify-center items-center space-y-1 w-full 
                md:flex-row md:justify-around md:items-start md:space-x-5 md:space-y-0"
      >
        {/* ====================== Local =========================== */}
        <div>
          <MenuButton
            title={gameModeLocal[gameLanguage()]}
            onClick={() => setActualPage(PageEnum.local)}
          />
        </div>
        {/* ====================== En Ligne =========================== */}
        <div>
          <MenuButton
            title={gameModeOnline[gameLanguage()]}
            onClick={() => setShowContentLigne(!showContentLigne())}
          />
          <Show when={showContentLigne()}>
            <div class="card card-compact w-64 p-2 shadow bg-slate-800 text-primary-content">
              <div class="card-body">
                <SubMenuButton
                  title={randomOpponent[gameLanguage()]}
                  onClick={() => setActualPage(PageEnum.online)}
                />
                <SubMenuButton
                  title={privateGame[gameLanguage()]}
                  onClick={() => {
                    setPrivateGameCode();
                    setPrivateGameMode(true);
                    setActualPage(PageEnum.online);
                  }}
                />
                <button
                  class={`btn bg-slate-700 
                              ${
                                inputValue().length === lengthCode
                                  ? ""
                                  : "bg-slate-700 cursor-not-allowed"
                              }`}
                  disabled={inputValue().length !== lengthCode}
                  onClick={() => {
                    setPrivateGameMode(true);
                    setPrivateGameCode(inputValue());
                    const codeCheckSocket = io(
                      import.meta.env.DEV
                        ? "http://localhost:8000"
                        : "https://s12-back-bf7d3c384d86.herokuapp.com/"
                    );
                    codeCheckSocket.emit("is code correct", privateGameCode());
                    codeCheckSocket.on("code is correct", (req: boolean) => {
                      codeCheckSocket.disconnect();
                      req
                        ? setActualPage(PageEnum.online)
                        : console.log("incorrect code");
                    });
                  }}
                >
                  {joinPrivateGame[gameLanguage()]}
                </button>
                <div class="flex justify-center">
                  <input
                    type="text"
                    placeholder="Code"
                    class="input input-bordered input-secondary w-2/3 
                        text-white"
                    maxlength={lengthCode}
                    onInput={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Show>
        </div>
        {/* ====================== Contre l'IA =========================== */}
        <div>
          <MenuButton
            title={gameModeIA[gameLanguage()]}
            onClick={() => setShowContentIA(!showContentIA())}
          />
          <Show when={showContentIA()}>
            <div class="card card-compact w-64 p-2 shadow bg-slate-800 text-primary-content">
              <div class="card-body">
                <SubMenuButton
                  title={easy[gameLanguage()]}
                  onClick={() => {
                    setAiDifficultyLevel(DifficultyLevelEnum.easy);
                    setActualPage(PageEnum.ia);
                  }}
                />
                <SubMenuButton
                  title={medium[gameLanguage()]}
                  onClick={() => {
                    setAiDifficultyLevel(DifficultyLevelEnum.medium);
                    setActualPage(PageEnum.ia);
                  }}
                />
                <SubMenuButton
                  title={hard[gameLanguage()]}
                  onClick={() => {
                    setAiDifficultyLevel(DifficultyLevelEnum.hard);
                    setActualPage(PageEnum.ia);
                  }}
                />
                <SubMenuButton
                  title={veryHard[gameLanguage()]}
                  onClick={() => {
                    setAiDifficultyLevel(DifficultyLevelEnum.veryHard);
                    setActualPage(PageEnum.ia);
                  }}
                />
              </div>
            </div>
          </Show>
        </div>
      </div>
    </>
  );
}
