import { For, JSX, JSXElement, Show, createSignal, onCleanup } from "solid-js";
import ChatMessage, { ChatMessageProps, WhoChatEnum } from "./ChatMessage";

export const [messages, setMessages] = createSignal<ChatMessageProps[]>([])

function Chat(){
  // setMessages([{message: "moi", temps: "mtnt", who: WhoChatEnum.self},
  // {message: "pas moi", temps: "mtnt", who: WhoChatEnum.opponent}])
  const [isDivVisible, setIsDivVisible] = createSignal<Boolean>(false);

  // Affiche ou masque le chat
  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible()); // Utilisez isDivVisible() pour lire la valeur sans l'appeler comme une fonction
  };
  
  // Lorsque la touche entrée est appuyé, ajoute le message dans le chat.
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const chatDiv = document.getElementById('chat'); 
      const input = e.currentTarget;
      if(input instanceof HTMLInputElement && chatDiv != null){
        // Mettre à jour la liste des messages 
        setMessages((prev) => {
          const test = [...prev]
          test.push({message: input.value, temps:"", who:WhoChatEnum.self})
          return test
        })
        // Effacer l'input ou effectuer d'autres actions si nécessaire
        input.value = ""
        // Faire défiler automatiquement vers le bas pour voir le nouveau message
        chatDiv.scrollTop = chatDiv.scrollHeight;
        // Send to server 

      }
    }
  }

  // Afficher le message du locuteur
  onCleanup(()=> {
    setMessages([])
  })
  return (
    <>
    <div class="z-chatbutton fixed bottom-0 right-0">
      <button
        class=" p-4 rounded-lg shadow-md"
        onClick={toggleDiv}
        >
        <img width="100" height="100" src="src/assets/speech-bubble-with-dots.png" alt="speech-bubble-with-dots"/>
      </button>
    </div>
    <Show when={isDivVisible()}>
      <div class=" z-chat flex flex-col fixed bottom-0 right-0 h-3/5 p-16">

        <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div id="chat" class="flex flex-col flex-grow h-0 p-4 overflow-auto">
            <For each={messages()}>{(message) =>
              <ChatMessage message={message.message} temps={message.temps} who={message.who} />
            }</For>
          </div>   
          <div class="bg-gray-300 p-4">
            <input onKeyDown={handleKeyDown} class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…"/>
          </div>
        </div>

      </div>
    </Show>
    </>
  );
}

export default Chat;
