import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import I1 from '../assets/1.png'
import { useSelector } from 'react-redux'
import { signedSelector } from '../redux/slices/signed';
import {SocketContext} from '../context/socket';

import '../styles/playersAmount.scss'

export default function PlayerAmount(){

    const
        signed = useSelector(signedSelector.getSigned).signed,
        socket = useContext(SocketContext), 
        [amount, setAmount] = useState<number>(2),
        navigate = useNavigate();

    function createRoom(){
        console.log(signed)
        if(signed&&socket){
            socket.emit('create_room', {amount: amount}, function(event: any){
                console.log(event)
                navigate('/qr_code/' + event.link);
            })
        }
    }    

    return(
        <div className="player_amount">
            <div className='choose_amount_container'>
                <div className='choose_amount'>
                    <h1>Обирай кількість гравців та GO !</h1>
                    <div>
                        <button onClick={() => amount > 2 && setAmount(amount-1)}>-</button>
                        <span>{amount}</span>
                        <button onClick={() => amount < 8 && setAmount(amount+1)}>+</button>
                    </div>
                    <button onClick={() => createRoom()} className='yellow_button amount_button'>Розпочати</button>
                </div>
            </div>
            <div className='choosen_game'>
                <img src={I1} alt="choosen game"/>
                <span>{'Classic game'}</span>
            </div>
        </div>
    )
}