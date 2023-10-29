import { gameLanguage } from "../App";
import { gameTitle } from "../languageDict";
import HeaderButton from "./headerButton";
import LangButton from "./langButton";
import "./anime-title.css";
// TODO: Utiliser le theme tailwind pour les couleurs OU un fichier constant
export default function () {
  const title = gameTitle[gameLanguage()]
  return (
    <div class="relative w-full h-36 z-header flex justify-center flex-wrap content-center">
      <HeaderButton />
      <LangButton />
      <h1
        class="text-center font-extrabold select-none text-red-600 text-[55px] 
                 md:text-[75px]"
      >
        <div class="container-title">
          {title.split('').map((letter, index) => <span style={`animation-delay: ${index * 0.2}s`}>{letter}</span>)}
        </div>
      </h1>
    </div>
  );
}
