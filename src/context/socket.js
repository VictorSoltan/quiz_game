import React from 'react'
import { io } from 'socket.io-client'

let newSocket 
// let link = 'http://localhost:3000'
let link = 'https://quiz-game-back.onrender.com/'

export function connectSocket(){  
    newSocket = io(link) 
    console.log(newSocket)
    return newSocket
}

export const socket = newSocket;
export const SocketContext = React.createContext();
