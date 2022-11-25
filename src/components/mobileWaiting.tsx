import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'
import Uknown from '../assets/players/uknown.png'
import { socket } from '../context/socket'
import {SocketContext} from '../context/socket';

import '../styles/mobileWaiting.scss'

export default function MobileWaiting(){

    const players = [
        {img: I1, name: 'Мари', ready: true},
        {img: I2, name: 'Вика', ready: true},
        {img: Uknown, name: 'Олекса', ready: false},
        {img: I3, name: 'ЕщеКтот', ready: true},
        {img: Uknown, name: 'Олекса', ready: false},
        {img: I4, name: ')0)))', ready: true}
    ],
    socket = useContext(SocketContext),
    navigate = useNavigate()

    useEffect(() => {
        if(socket){
            let link = window.location.pathname.replace('/mobile_waiting/', '')

            socket.on('game_started', function(event: any){
                console.log(event)
                navigate('/mobile_game/' + link)
            })
        }
    }, [socket, navigate])

    function joinGame(){
        socket.emit('join_game', {link: window.location.pathname.replace('/mobile_waiting/', '')}, function(event: any){
            // navigate('/mobile_game')
        })
    }

    return(
        <div className="mobile_waiting">
            <h1>Готові до гри ?</h1>
            <div className='waiting_players'>
                {players.map((item, index) => (
                    <div key={index} style={item.ready ? {} : {opacity: '0.5'}}>
                        <img src={item.img} alt="player" className='player' />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
            <button onClick={() => joinGame()} className='yellow_button'>Готовий</button>
        </div>
    )
}