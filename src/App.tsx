import { createSignal, Switch, type JSXElement, Match } from 'solid-js';

import Header from './components/header';
import { LanguageEnum } from './languageDict';
import Menu from './components/menu';
import OnlineGame from './components/onlineGame';
import LocalGame from './components/localGame';

// TODO: Par default utiliser la langue du browser
// TODO: The user should be able to change langage
export const gameLanguage = LanguageEnum.fr

// TODO: Rename
export enum PageEnum {
  menu,
  local,
  online,
  ia
}

// ! USELESS COMMENT

// TODO: Rename
export const [actualPage, setActualPage] = createSignal(PageEnum.menu)

// TODO: Rewrite (refactor LocalGame and OnlineGame)
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
          <OnlineGame />
        </Match>
      </Switch>
    </>
  )
}