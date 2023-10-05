import { Show, createSignal } from "solid-js";

function Chat() {
  const [isDivVisible, setIsDivVisible] = createSignal(false);
  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible()); // Utilisez isDivVisible() pour lire la valeur sans l'appeler comme une fonction
  };

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
  <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
    <div class="flex w-full mt-2 space-x-3 max-w-xs">
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet.</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs">
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet.</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs">
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
    </div>
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">Lorem ipsum dolor sit.</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
  </div>
  
  <div class="bg-gray-300 p-4">
    <input class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…"/>
  </div>
</div>

</div>
    </Show>
    </>
  );
}

export default Chat;
