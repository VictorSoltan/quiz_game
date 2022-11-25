import React from 'react'
import { io } from 'socket.io-client'

let newSocket 

export function connectSocket(){  
    newSocket = io(`http://localhost:8080/`) 
    console.log(newSocket)
    return newSocket
}

export const socket = newSocket;
export const SocketContext = React.createContext();
