import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import I1 from '../assets/phone/profile/1.png';
import I2 from '../assets/phone/profile/2.png';
import I3 from '../assets/phone/profile/3.png';
import I4 from '../assets/phone/profile/4.png';
import I5 from '../assets/phone/profile/5.png';
import I6 from '../assets/phone/profile/6.png';
import {SocketContext} from '../context/socket';
import { signedSelector } from '../redux/slices/signed';

import '../styles/mobileResults.scss';

export default function MobileResults(){
    
    const results = [
        {value: 7, profiles: [I1]},
        {value: 5, profiles: [I2]},
        {value: 3, profiles: [I3, I4, I5]},
        {value: 2, profiles: [I6]}
    ],
    socket = useContext(SocketContext),
    signed = useSelector(signedSelector.getSigned).signed,
    {state} = useLocation(),
    navigate = useNavigate(),
    [room, setRoom] = useState<Array<any>>([]),
    link = window.location.pathname.replace('/mobile_results/', '')
    
    useEffect(() => {
        if(socket&&signed){
            if(state.link==='mobile_final_round'){
                socket.emit('request_results', {link: link}, function(event: any){
                    console.log(event)
                    setRoom(event)
                })   
            }else socket.emit('request_players', {link: link}, function(event: any){
                console.log(event)
                setRoom(event.room)
            })
        }
        console.log()
        if(state.link!=='') setTimeout(() => {
            navigate('/'+state.link+'/'+ link) 
        }, 5000)
    }, [socket, signed])

    console.log(state)
    return(
        <div className="mobile_results">
            <h1>Результати:</h1>
            <div className="results">
                {room.map((item, index) => (
                    <div key={index} className="result">
                        <div>
                            {/* {item.profiles.map((item, indx) => ( */}
                                <img src={I1} alt="profile" />
                            {/* ))} */}
                        </div>
                        <span>{item.points}</span>
                    </div>

                ))}
            </div>
            {/* <button className="yellow_button">Поїхали далі</button> */}
        </div>
    )
}