// TODO: refactor with / use board.tsx
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { io } from 'socket.io-client';

import GameContext, { GameStepEnum, PieceEnum, setGameStep, switchTurn } from './gameContext';
import Board, { WinningPiecesType, boardStateDictType, getInitialBoard, setBoardState, setWinningPieces } from './board';
import { playerMove, setPlayerMove } from './boardItem';
import Chat from './Chat';

export const [playerPieceColor, setPlayerPieceColor] = createSignal<PieceEnum>()

// TODO: Don't use GameStepEnum but a specific one ?
type WinningRequestType = {
    result: GameStepEnum,
    board: boardStateDictType,
    winningPieces?: WinningPiecesType
}

type TimerInfos = {
  currentTime: string;
  playerPiece: string;
}


export default function () {
    // TODO: Put url in .env
    const socket = io(import.meta.env.DEV ? "http://localhost:8000" : "https://s12-back-bf7d3c384d86.herokuapp.com/")
    
    // Timer des joueurs 
    const [timerRed, setTimerRed] = createSignal("0:00");
    const [timerYellow, setTimerYellow] = createSignal("0:00");

    // player color
    socket.on("player color", (req) => {
      console.log(req)
      setPlayerPieceColor(req == "red" ? PieceEnum.red : PieceEnum.yellow)
      if (req == "yellow") {
        setGameStep(GameStepEnum.waiting)
        socket.on('opponent ready', (req) => {
            setGameStep(GameStepEnum.playing)
        })

      } else {
        console.log("red so opponent is already ready")
      }}
    )

    socket.on("disconnection order", () => {
        setGameStep(GameStepEnum.opponentLeft)
        socket.disconnect()
    })
  
    createEffect(() => {
        const move = playerMove()
        if (!move) return;
        socket.emit("move", move)
    })
    
    // TODO: Check these ones works properly
    socket.on("moved", (req: boardStateDictType)=> {
        switchTurn()
        setBoardState(req)
    })
    socket.on("game result", (req: WinningRequestType) => {
        setBoardState(req.board);
        if (req.winningPieces) {
            setWinningPieces(req.winningPieces)
        }
        setGameStep(req.result)
        socket.disconnect()
    })
    
    // Mise à jour des timer 
    socket.on("timer", (req: TimerInfos) => {
      req.playerPiece == PieceEnum.red ? setTimerRed(req.currentTime) : setTimerYellow(req.currentTime)
    })

    onCleanup(()=> {
        // TODO: Check if working properly
        socket.disconnect()
        setBoardState(getInitialBoard())
        setPlayerMove()
    })
    return (
      <>
       {/* space-x : gap
           p-      : padding */}
        <div class="flex justify-center items-center w-screen space-x-3 p-2">
          <span class="countdown font-mono text-2xl">
            {timerRed()}
          </span>
          <div class="w-12 h-12 bg-red-600 rounded-full"></div>
          <div class="w-12 h-12 bg-yellow-400 rounded-full"></div>
          <span class="countdown font-mono text-2xl">
            {timerYellow()}
          </span>
        </div>
        <GameContext>
            <Board />
            <Chat socket={socket}/>
        </GameContext>
      </>
    );
}