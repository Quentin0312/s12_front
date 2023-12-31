import { JSXElement } from "solid-js";
import { PieceEnum } from "./gameContext";
import { playerPieceColor } from "./onlineGameBis";

export enum WhoChatEnum {
  opponent,
  self,
}

export type ChatMessageProps = {
  who: PieceEnum;
  message: string;
  temps: string;
  image?: any;
};

export default function (props: ChatMessageProps) {
  // Construit la structure html correspondant au locuteur.
  const locuteur = (message: string, temps: string): JSXElement => {
    return (
      <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p class="text-sm"> {message} </p>
          </div>
          <span class="text-xs text-gray-500 leading-none"> {temps} </span>
        </div>
      </div>
    );
  };
  const interlocuteur = (message: string, temps: string) => {
    return (
      <div class="flex w-full mt-2 space-x-3 max-w-xs">
        <div>
          <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p class="text-sm"> {message} </p>
          </div>
          <span class="text-xs text-gray-500 leading-none"> {temps} </span>
        </div>
      </div>
    );
  };

  // TODO: Utiliser comme des composant <Composant />
  return props.who == (playerPieceColor() as PieceEnum)
    ? locuteur(props.message, props.temps)
    : interlocuteur(props.message, props.temps);
}
