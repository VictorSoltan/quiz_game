import { useState, useEffect, useContext} from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'
import Star from '../assets/players/star.svg'
import {SocketContext} from '../context/socket';
import { signedSelector } from '../redux/slices/signed';

import '../styles/results.scss'

export default function Results(){

    const players = [
        {img: I1, name: 'Мари', score: 4},
        {img: I2, name: 'Вика', score: 5},
        {img: I3, name: 'ЕщеКтот', score: 6},
        {img: I4, name: ')0)))', score: 4},
        {img: I2, name: 'Вика', score: 3}
    ],
    finale = false,
    socket = useContext(SocketContext),
    signed = useSelector(signedSelector.getSigned).signed,
    {state} = useLocation(),
    navigate = useNavigate(),
    [room, setRoom] = useState<Array<any>>([]),
    link = window.location.pathname.replace('/results/', '')
    
    useEffect(() => {
        if(socket){
            socket.emit('request_players', {link: link}, function(event: any){
                console.log(event)
                setRoom(event.room)
            })
        }
        console.log()
        setTimeout(() => {
            // navigate('/'+state.link+'/'+ link) 
          }, 5000)
    }, [socket])

    return(
        <div className="results_container">
            <h1 className='big_nameplate' style={!finale ? {visibility: 'visible'} : {margin: '4vh 0 -4vh'}}>Результати</h1>
            <h3 className='average_nameplate' style={!finale ? {visibility: 'visible'} : {visibility: 'hidden'}}>за фінальним раундом</h3>
            <div className='results'>
                {room.map((item, index) => (
                    <div key={index} className='result_container' style={index%2 ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'}}>
                        <div className='result'>
                            <div className='score'>
                                {!finale && <img src={Star} alt="score" />}
                                <span className={finale ? 'round_span' : ''}>{item.score}</span>
                            </div>
                            <img src={item.img} alt="player" className='player' />
                            <h6>{item.name}</h6>
                            <div className='stars'>
                                {Array.from(Array(item.score).keys()).map(() => (
                                    <img src={Star} alt="star" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}