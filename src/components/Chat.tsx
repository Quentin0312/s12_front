// TODO: Rewrite the whole file !!!!!!!

// TODO: Mettre le chat au dessus de l'overlay pour permettre la discussion post game
// TODO: Mettre en place clic à l'exterieur du chat, ferme celui-ci
import { For, Show, createEffect, createSignal, onCleanup } from "solid-js";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { Socket } from "socket.io-client";
import { PieceEnum } from "./gameContext";
import { playerPieceColor } from "./onlineGameBis";
import ChatButton from "./ChatButton";

export class Message {
  who: PieceEnum;
  message: string;
  id: string;
  temps: string;
  private tempsBrut: Date;

  constructor(contenu: string) {
    this.tempsBrut = new Date();
    this.id = this.generateID(this.tempsBrut);
    this.message = contenu;
    this.temps = this.getDate(this.tempsBrut);
    this.who = playerPieceColor() as PieceEnum;
  }

  private generateID(tempsBrut: Date): string {
    return tempsBrut.getTime().toString();
  }

  private getDate(tempsBrut: Date): string {
    const temps = tempsBrut.getHours() + ":" + tempsBrut.getMinutes();
    return temps;
  }
}

export const [messageList, setMessagesList] = createSignal<ChatMessageProps[]>(
  []
);

type ChatProps = {
  socket: Socket;
};

const [isChatVisible, setIsChatVisible] = createSignal<boolean>(false);

// Affiche ou masque le chat
export const toggleChat = () => {
  setIsChatVisible(!isChatVisible()); // Utilisez isDivVisible() pour lire la valeur sans l'appeler comme une fonction
};

// Affiche le nombre de message entre chaque input ou action button
export const [unreadMessagesNumber, setUnreadMessagesNumber] =
  createSignal<number>(0);

function Chat(props: ChatProps) {
  const socket = props.socket;

  // TODO: Rewrite
  // Lorsque la touche entrée est appuyé, ajoute le message dans le chat.
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const chatDiv = document.getElementById("chat");
      const input = e.currentTarget;
      if (input instanceof HTMLInputElement && chatDiv != null) {
        // Mettre à jour la liste des messages
        // TODO: Mettre en place affichage temporaire pour 'cacher' lag reponse serveur

        if (input.value == "") return;

        // Send to server
        sendMessage(input.value);

        // Reset input value
        input.value = "";

        // Faire défiler automatiquement vers le bas pour voir le nouveau message
        // chatDiv.scrollTop = chatDiv.scrollHeight; // TODO: Fix
        updateScrollTop();
      }
    }
  };

  // Faire défiler automatiquement vers le bas pour voir le nouveau message
  const updateScrollTop = () => {
    const chatDiv = document.getElementById("chat");
    if (chatDiv != null) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  };

  const sendMessage = (m: string) => {
    const messageToEmit = new Message(m);
    socket.emit("message", messageToEmit);
  };

  // TODO: Rename "messages to update" => "updatedMessageList"
  socket.on("messages to update", (response: ChatMessageProps[]) => {
    // Bulle de notification de reception de message
    setMessagesList(response);
    if (!isChatVisible()) {
      setUnreadMessagesNumber((prev) => prev + 1);
    }
  });

  createEffect(() => {
    if (isChatVisible()) {
      setUnreadMessagesNumber(0);
    }
  });

  onCleanup(() => {
    setMessagesList([]);
    // ! Les autres signaux ?
  });
  return (
    <>
      <ChatButton />
      <Show when={isChatVisible()}>
        <div class=" z-chat flex flex-col fixed bottom-0 right-0 h-3/5 p-16">
          <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div
              id="chat"
              class="flex flex-col flex-grow h-0 p-4 overflow-auto"
            >
              <For each={messageList()}>
                {(message) => (
                  <ChatMessage
                    message={message.message}
                    temps={message.temps}
                    who={message.who}
                  />
                )}
              </For>
            </div>
            <div class="bg-gray-300 p-4">
              <input
                onKeyDown={handleKeyDown}
                class="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                placeholder="Type your message…"
              />
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

export default Chat;
