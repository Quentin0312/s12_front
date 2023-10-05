import { gameLanguage } from "../App"
import {gameTitle } from "../languageDict"
import HeaderButton from "./headerButton"
// TODO: Utiliser le theme tailwind pour les couleurs
// TODO: Ajouter possibilté de revenir au choix du mode de jeu
// TODO: Créer un composant avec le bouton back to game mode selection
export default function () {
    return(
        <div class="relative w-full h-36 z-header bg-white border border-t-2">
            <HeaderButton />
            <h1 class="text-center font-extrabold text-[75px] select-none text-[#ff0000]">{gameTitle[gameLanguage]}</h1>
        </div>
    )
}