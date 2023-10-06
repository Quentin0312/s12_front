import { JSXElement } from "solid-js"

export enum WhoChatEnum {
    opponent,
    self
}

export type ChatMessageProps = {
    who: WhoChatEnum,
    message: string,
    temps: string,
    image ?: any
}

export default function (props: ChatMessageProps) {
  // Construit la structure html correspondant au locuteur.
  const locuteur = (message: string, temps: string): JSXElement => {
    return(
      <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p class="text-sm"> {message} </p>
            </div>
            <span class="text-xs text-gray-500 leading-none"> {temps} </span>
        </div>
        {/* <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" /> */}
      </div>
    )
  }
  const interlocuteur = (message: string, temps: string) => {
    return(
      <div class="flex w-full mt-2 space-x-3 max-w-xs">
      {/* <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
      <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p class="text-sm"> {message} </p>
        </div>
        <span class="text-xs text-gray-500 leading-none"> {temps} </span>
      </div>
    </div>
    )
  }

  return props.who == WhoChatEnum.self
    ? locuteur(props.message, props.temps)
    : interlocuteur(props.message, props.temps)
}