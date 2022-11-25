import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Players from './players'
import {SocketContext} from './../context/socket';
import Countdown from 'react-countdown';

import '../styles/roundEnd.scss';

export default function RoundEnd(){
    const [players, setPlayers] = useState<Array<any>>([]),
        [time, setTime] = useState<number>(0),
    socket = useContext(SocketContext),
    navigate = useNavigate(),
    [question, setQuestion] = useState<Array<any>>([]),
    [numb, setNumb] = useState<number>(0)

    useEffect(() => {
        if(socket){
        let link = window.location.pathname.replace('/round_end/', '')
            socket.emit('get_questions_sorting', function(event: any){
                console.log('get_questions_sorting ', event)
                setQuestion(event.questions)
                setTime(Date.now() + event.time)
            })  
            socket.on('end_sorting_sorting', function(){
                navigate('/result_tour/' + link, { state: {link: 'game_start'}})
            })
            socket.on('end_sorting_theme_sorting', function(){
                navigate('/result_tour/' + link, { state: {link: 'game_start'}})
            })
            socket.on('end_sorting_connections', function(){
                navigate('/results/' + link, { state: {link: 'final_round'}})
            })
        }

    }, [socket])
    return(
        <div className="round_end">
            <h1>Раунд <span>Сорування</span></h1>
            <div className='message'>У гравців є одна хвилина,<br/>аби дати якомога більше правильних відповідей</div>
            {time && <Countdown date={time} 
                    renderer={ ({minutes, seconds} : {minutes: number, seconds: number}) => <h2 className='timer'>{minutes}:{seconds}</h2> } />}  
                          
            <Players players={players} />
        </div>
    )
}