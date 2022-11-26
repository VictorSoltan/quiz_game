import { useState, useContext, useEffect, useRef } from 'react';
import {SocketContext} from '../context/socket';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

import '../styles/mobileFinalRound.scss';

export default function MobileFinalRound(){
    const 
        link = window.location.pathname.replace('/mobile_final_round/', ''),
        [ value, setValue ] = useState(100), 
        inputRef = useRef<HTMLInputElement>(null),
        socket = useContext(SocketContext),
        navigate = useNavigate(),
        [question, setQuestion] = useState<{question: any, time: number, final_round: number}>({question: {}, time: 0, final_round: 0})
        let link_router = 'mobile_final_round'

    useEffect(() => {
        if(socket){
            
            socket.emit('final_round_question', function(event: any){
                console.log('final_round_question ', event)
                setQuestion(event)
            })
        }
    }, [socket])      

    useEffect(() => {

        console.log('question update', question)
        if(socket){
            socket.on('final_round_results', function(){
                console.log('question.final_round ', question.final_round)
                if(question.final_round > 3) link_router = ''
                navigate('/mobile_results/' + link, { state: {link: link_router}})
            })     
        }

    }, [socket, question])   
    // useEffect(() => {
        // inputRef.slider.getDOMNode().orient = 'vertical';

    // })

    function sendAnswer(){
        socket.emit('send_answer', {answer: value}, function(event: any){
        
        })
        console.log(value)
    }

    return(
        <div className='mobile_final_round'>
            <div className='select_theme_container'>
                <p>У цьому раунді молодець той,<br/> хто дасть відповідь найближче до правильної</p>
            </div>
            <section className='choose_answer'>
                <h1 className='label'>{question?.question?.question}</h1>
                <div className='choose_number'>
                    <div className='info'>
                        <span>Введи Число</span>
                        <input value={value} onChange={(e) => setValue(e.target.value as any)} />
                        <div className='slider_container'>
                        <div>
                            <h6>{question?.question?.min}</h6>
                            <span />
                        </div>
                        <input type="range" ref={inputRef} onChange={(e) => setValue(e.target.value as any)} min={question?.question?.min} max={question?.question?.max} value={value} className="slider" id="myRange" />
                        <div>
                            <h6>{question?.question?.max}</h6>
                            <span />
                        </div>  
                    </div>
                    <button onClick={() => sendAnswer()} className='yellow_button'>Готово</button>
                    </div>
                </div>        
                {question?.time>0 &&
                    <Countdown date={Date.now() + question?.time} 
                        renderer={ ({minutes, seconds} : {minutes: number; seconds: number}) => <h1 className='timer'>{minutes}:{seconds}</h1> } />}
            </section>
        </div>
    )
}