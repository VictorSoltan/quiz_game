import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Uknown from '../assets/players/uknown.png'

import Vector from '../assets/players/Vector.svg'

import QRCode from "react-qr-code";
import {SocketContext} from '../context/socket';

import '../styles/waitingFriends.scss'

export default function WaitingFriends(){

    const [players, setPlayers] = useState<Array<any>>([
        // {img: I1, name: 'Мари', ready: true},
        // {img: I2, name: 'Вика', ready: true},
        // {img: Uknown, name: '', ready: false},
        // {img: I3, name: 'ЕщеКтот', ready: true},
        // {img: Uknown, name: '', ready: false},
        // {img: I4, name: ')0)))', ready: true}
    ]),
    navigate = useNavigate(),
    [amount, setAmount] = useState<number>(0),
    socket = useContext(SocketContext)

    useEffect(() => {
        if(socket){
            let link = window.location.pathname.replace('/waiting/', '')
            socket.emit(`request_players`, {link: link}, function(event: any){
                console.log('event.room ', event)
                if(event) setPlayers(event.room); setAmount(event.amount)
            })
            console.log(`waiting_players_${link}`)
            socket.on(`waiting_players_${link}`, function(event: any){
                console.log(event)
                setPlayers(event.room)
            })
        }
    }, [socket])

    function startGame(){
        if(socket){
            let link = window.location.pathname.replace('/waiting/', '')
            socket.emit('start_game', {link: window.location.pathname.replace('/waiting/', '')}, function(event: any){
                console.log(event)
                navigate('/game_start/' + link)
            })
        }
    }

    return(
        <div className='waiting_friends'>
            <div className='waiting_friends_content'>
                <div className='players_banner'>
                    <div/>
                    {!players.length ? <h1>Очікуємо гравців...</h1>
                        : <button onClick={() => startGame()}>Розпочати</button> }
                </div>
                <div className='qr'>
                    <div className='qr_code'>
                        <QRCode 
                            viewBox={`0 0 256 256`} 
                            style={{ height: "auto", maxWidth: "90%", width: "90%" }} 
                            value={window.location.origin + '/quiz_game/#/mobile_profile'} 
                        />
                    </div> 
                    <Link to={"/qr_code/" + window.location.pathname.replace('/waiting/', '')} className='yellow_button'>Кімната підключення</Link>
                </div>
            </div>
            <div className='waiting_players'>
                {players.map((item, index) => (
                    <div key={index} style={!item.ready ? {opacity: '0.7'} : {}}>
                        <img src={item.img ? item.img : Uknown} alt="player" className='player' />
                        <span>{item.ready ? item.name : item.player}</span>
                        {item.ready && <h6>ще чекаємо</h6>}
                        {!item.ready &&
                            <img src={Vector} alt="ready" />}
                    </div>
                ))}
            </div>
        </div>
    )
}