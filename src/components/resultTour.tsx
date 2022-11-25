import { useState, useEffect, useContext} from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'
import {SocketContext} from '../context/socket';
import { signedSelector } from '../redux/slices/signed';
    
import '../styles/resultTour.scss';
    
export default function ResultTour(){

        const players = [
            { img: I1, score: 3},
            { img: I3, score: 2},
            { img: I2, score: 3},
            { img: I4, score: 5},
            { img: I2, score: 0},
            { img: I4, score: 7}
        ],
        finale = false,
        socket = useContext(SocketContext),
        signed = useSelector(signedSelector.getSigned).signed,
        {state} = useLocation(),
        navigate = useNavigate(),
        [room, setRoom] = useState<Array<any>>([]),
        link = window.location.pathname.replace('/result_tour/', '')
        
        useEffect(() => {
            if(socket){
                socket.emit('request_players', {link: link}, function(event: any){
                    console.log(event)
                    setRoom(event.room)
                })
            }
            console.log()
            setTimeout(() => {
                navigate('/'+state.link+'/'+ link) 
              }, 5000)
        }, [socket])
    return(
        <div className='result_tour'>
            <h1>Результати:</h1>
            <div className='results'>
                {room.map((item, index) => (
                    <div key={index} className='result'>
                        <span>{item.points}</span>
                        <div className='score' style={{height: `${item.points*22}px`}} />
                        <img src={I1} alt="profile score" />
                    </div>
                ))}
            </div>
        </div>  
    )
}
