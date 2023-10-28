import { createSignal, Switch, JSXElement, Match } from "solid-js";

import Header from "./components/header";
import Menu from "./components/menu";
import LocalGame from "./components/localGame";
import IaGameMedium from "./components/iaGameMedium";

import { LanguageEnum } from "./languageDict";
import OnlineGameBis from "./components/onlineGameBis";
// TODO: Par default utiliser la langue du browser
// TODO: The user should be able to change langage

// TODO: Rename
export enum PageEnum {
  menu,
  local,
  online,
  ia,
}

// TODO: Rename
export const [actualPage, setActualPage] = createSignal(PageEnum.menu);
export const [gameLanguage, setGameLanguage] = createSignal<LanguageEnum>(
  LanguageEnum.fr
);
// TODO: Rewrite
export default function (): JSXElement {
  return (
    <>
      <Header />
      <Switch>
        <Match when={actualPage() == PageEnum.menu}>
          <Menu />
        </Match>

        <Match when={actualPage() == PageEnum.local}>
          <LocalGame />
        </Match>

        <Match when={actualPage() == PageEnum.online}>
          {/* <OnlineGame /> TO DELETE */}
          <OnlineGameBis />
        </Match>

        <Match when={actualPage() == PageEnum.ia}>
          <IaGameMedium />
        </Match>
      </Switch>
    </>
  );
}
