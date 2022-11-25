import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Players from './players'
import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'
import {SocketContext} from '../context/socket';

import '../styles/question.scss'

export default function Question(){
    
    const answers = [
        'В амперах',
        'В Порошенках',
        'В вольтах',
        'В каденціях'
    ],
    [players, setPlayers] = useState<Array<any>>([]),
    profile_answers = [
        [I1],
        [I1, I2, I3],
        [I3, I4],
        [],
    ]
    const [themes, setThemes] = useState<any>([
    ]),
    [time, setTime] = useState<number>(0),
    [question, setQuestions] = useState<any>(null),
    socket = useContext(SocketContext),
    navigate = useNavigate(),
    link = window.location.pathname.replace('/question/', '')

    useEffect(() => {
        if(socket){
            socket.emit('get_questions', function(event: any){
                console.log(event)
                setQuestions(event.questions)
                setTime(Date.now() + event.time)
            })       
            socket.on('end_sorting_questions', function(){
                navigate('/result_tour/' + link, { state: {link: 'game_start'}})
            })  
            socket.on('end_of_round', function(event: any){
                console.log('end_of_round ', event)
                if(event.tour === 4)  navigate('/results/' +link, { state: {link: 'final_round'}})
                else navigate('/result_tour/' + link, { state: {link: 'round_end'}})
            })
        }
    }, [socket])

    return(
        <div className="question">
            <h1>Результати:</h1>
            <div className='question_content'>
                <div className='question_banner'>
                    <h1>{question && question?.question} </h1>
                </div>
                <div className='answers'>
                    <div style={{width: '65%'}}>
                        {question && question?.answers.map((item: any, index: number) => (
                            <div key={index} className='answer_button'>
                                <button className='yellow_button' >{item.text}</button>
                                <span>
                                    {profile_answers[index].map((item, index: number) => (
                                        <img key={index} src={item} alt="player" />
                                    ))}
                                </span>
                            </div>
                        ))}
                    </div>
                    <span className='theme_id'>5</span>
                </div>
            </div>            
            <Players players={players} />
        </div>
    )
}