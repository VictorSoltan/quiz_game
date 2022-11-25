import React from 'react'
import { io } from 'socket.io-client'

let newSocket 

export function connectSocket(){  
    newSocket = io(`https://quiz-game-back.onrender.com/`) 
    console.log(newSocket)
    return newSocket
}

export const socket = newSocket;
export const SocketContext = React.createContext();
