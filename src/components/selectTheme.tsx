import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/selectTheme.scss';
import Players from './players'
import {SocketContext} from '../context/socket';
import Countdown from 'react-countdown';

export default function SelectTheme(){

    const [themes, setThemes] = useState<any>([
    ]),
    [players, setPlayers] = useState<Array<any>>([]),
    [time, setTime] = useState<number>(0),
    socket = useContext(SocketContext),
    navigate = useNavigate(),
    link = window.location.pathname.replace('/game_start/', '')

    useEffect(() => {
        if(socket){
            socket.emit(`request_players`, {link: link}, function(event: any){
                console.log('event.room ', event)
                if(event) setPlayers(event.room);
            })            
            console.log('receive_themes ')
            socket.emit('receive_themes', function(event: any){
                console.log('receive_themes ', event)
                setThemes(event.themes)
                setTime(Date.now() + event.time)
            })
            socket.on(`theme_chosen_${link}` , function(event: any){
                console.log('theme_chosen', event)
                navigate('/question/' + link)
            })
        }
    }, [socket])

    return(
        <div className='select_theme'>
            <div className='select_theme_container'>
                <div className='choose_theme'>
                    <h1>Гравці відповідатимуть на питання з категорії, яка набере найбілше голосів</h1>
                    <p>(за нічиєю комп’ютер обере випадкову категорію з лідерів опитування)</p>
                </div>
                {time && <Countdown date={time} 
                    renderer={ ({seconds} : {seconds: number}) => <span className='theme_id'>{seconds}</span> } />}                     
            </div>
            <h1 className='select_theme'>Обери бажану</h1>
            <div className='themes'>
                {themes.map((item: any, index: number) => (
                    <div key={index}>{item.name}</div>
                ))}
            </div>
            {false && <div className='theme'>
                <span>5</span>
                <div>Цікаві факти</div>
                <span>5</span>
            </div>}
            <Players players={players} />
       
            <span className='theme_id theme_id_adapt'>5</span>    
        </div>
    )
}