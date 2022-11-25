import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {SocketContext} from '../../context/socket';

export default function RemoveTheExcess({setTime} : {setTime: any}) {
    const 
        answers = [
            'Чужий',
            'Я плюю на ваші могили',
            'Шоу Трумана',
            'Хоббіт'
        ],
        socket = useContext(SocketContext),
        [numb, setNumb] = useState<number>(0),
        [question, setQuestions] = useState<any>(null),
        // [time, setTime] = useState<number>(0),        
        [correctVal, setCorrectVal] = useState<{indx: number; value: boolean | null}>({indx: 0, value: null}),
        // { state } = useLocation(),
        // { questions, time } = state,
        navigate = useNavigate()

        useEffect(() => {
            if(socket){
                let link = window.location.pathname.replace('/remove_excess/', '')
                socket.emit('choose_theme_sorting', function(e: any){
                    console.log('choose_theme_sorting ', e)
                    setQuestions(e.questions)
                    setTime(Date.now() + e.time)
                })                
                socket.on('end_sorting_theme_sorting', function(){
                    navigate('/mobile_results/' +link, { state: {link: 'mobile_game'}})
                })     
            }
        }, [socket])        

    function giveAnwer(index: number){
        socket.emit(`give answer`, {index: index, numb: numb, questions: 'sorting_questions'}, function(e: any){
            console.log(e)
            setCorrectVal({indx: index, value: e})
            setTimeout(() => {
                setCorrectVal({indx: 0, value: null})
                setNumb(numb+1)
            }, 800)
        })
    }



    return(
        <>
            <h4>{question && question[numb]?.question}</h4> 
            <div className='answers' style={ answers.length>2 ? {width: '80%'} : {}}>
                {question && question[numb]?.answers.map((item: any, index: number) => (
                    <div style={question[numb]?.answers.length>2&&(index===0||index===3) ? {width: '100%'} : {}} key={index}>
                        <button onClick={() => giveAnwer(index)} style={answers.length>2 ? {width: '102px', height: '102px', background: correctVal.value === true&&correctVal.indx === index  ? 'green' : correctVal.value === false&&correctVal.indx === index ? 'red' : 'yellow' } : {}}>{item.text}</button>
                    </div>
                ))}
            </div>        
        </>
    )
}