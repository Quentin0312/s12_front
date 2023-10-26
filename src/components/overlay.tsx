import { Show } from "solid-js";
import { privateGameCode } from "./menu";

import "./overlay.css";
import { GameStepEnum, gameStep } from "./gameContext";

type OverlayProps = {
  message: string;
};

export default function (props: OverlayProps) {
  return (
    <div class="grid grid-cols-1">
      <div id="spinner-overlay" class=" z-overlay">
        <div class="text-white text-5xl select-none z-header">
          {props.message}
        </div>
      </div>
      <Show when={privateGameCode() && gameStep() == GameStepEnum.waiting}>
        <div class="text-white text-2xl z-header">
          {"Code de la partie: " + privateGameCode()}
        </div>
      </Show>
    </div>
  );
}
