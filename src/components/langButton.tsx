import { gameLanguage, setGameLanguage } from "../App";
import { LanguageEnum } from "../languageDict";

function onClick() {
  setGameLanguage((prev) =>
    prev == LanguageEnum.fr ? LanguageEnum.eng : LanguageEnum.fr
  );
}

export default function () {
  return (
    <div
      class="absolute right-5 top-3/4 md:top-1/2 ml-2 cursor-pointer select-none"
      onClick={onClick}
    >
      {gameLanguage() == LanguageEnum.fr ? "ENG" : "FR"}
    </div>
  );
}
