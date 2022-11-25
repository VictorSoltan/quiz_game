import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import {SocketContext} from '../../context/socket';

export default function SortingComponent({setTime} : {setTime: any}) {
    const 
        answers = [
            'Кіно',
            'Серіал'
        ],
        socket = useContext(SocketContext),
        navigate = useNavigate(),
        [question, setQuestion] = useState<Array<any>>([]),
        [numb, setNumb] = useState<number>(0)
    useEffect(() => {
        if(socket){
        let link = window.location.pathname.replace('/mobile_sorting/', '')
            socket.emit('get_questions_sorting', function(event: any){
                console.log('get_questions_sorting ', event)
                setQuestion(event.questions)
                setTime(Date.now() + event.time)
            })  
            socket.on('end_sorting_sorting', function(){
                navigate('/mobile_results/' + link, { state: {link: 'mobile_game'}})
            })
        }

    }, [socket])
     
    function giveAnwer(index: number){
        if(socket) socket.emit(`give answer`, {index: index, numb: numb, questions: 'sorting_questions_first'}, function(e: any){
            console.log(e)
            // setCorrectVal({indx: index, value: e})
            setTimeout(() => {
                // setCorrectVal({indx: 0, value: null})
                setNumb(numb+1)
            }, 800)
        })
    }

    return(
        <>
            <div className='yellow_button'>Кіно чи серіал ?</div>
            <h3>{question && question[numb]?.question}</h3>
            <p>Обери за назвою</p>
            <div className='answers' style={ answers.length>2 ? {width: '80%'} : {}}>
                {question && question[numb]?.answers.map((item: any, index: number) => (
                    <div style={answers.length>2&&(index===0||index===3) ? {width: '100%'} : {}} key={index}>
                        <button onClick={() => giveAnwer(index)} style={answers.length>2 ? {width: '102px', height: '102px'} : {}}>{item.text}</button>
                    </div>
                ))}
            </div>
        </>
    )
}