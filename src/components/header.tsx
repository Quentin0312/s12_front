import { gameLanguage } from "../App";
import { gameTitle } from "../languageDict";
import HeaderButton from "./headerButton";
import LangButton from "./langButton";
// TODO: Utiliser le theme tailwind pour les couleurs OU un fichier constant
export default function () {
  return (
    <div class="relative w-full h-36 z-header bg-white border border-t-2">
      <HeaderButton />
      <LangButton />
      <h1 class="text-center font-extrabold text-[75px] select-none text-[#ff0000]">
        {gameTitle[gameLanguage()]}
      </h1>
    </div>
  );
}
