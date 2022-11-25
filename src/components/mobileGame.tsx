import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {SocketContext} from '../context/socket';
import Countdown from 'react-countdown';
import { signedSelector } from '../redux/slices/signed';
import { inGameSelector } from '../redux/slices/inGame';
import { setInGameReducer } from '../redux/slices/inGame';

import '../styles/mobileGame.scss';

export default function MobileGame(){

    const 
        dispatch = useDispatch(),
        signed = useSelector(signedSelector.getSigned).signed,
        socket = useContext(SocketContext),
        [themes, setThemes] = useState<Array<{name: string}>>([]),        
        [question, setQuestions] = useState<any>(null),
        [time, setTime] = useState<number>(0),
        [correctVal, setCorrectVal] = useState<{indx: number; value: boolean | null}>({indx: 0, value: null}),
        [numb, setNumb] = useState<number>(0),
        [value, setValue] = useState(true),
        navigate = useNavigate()

    useEffect(() => {
        if(socket){
            let link = window.location.pathname.replace('/mobile_game/', '')
            if(value){
                console.log('receive_themes')
                socket.emit('receive_themes', function(event: any){
                    console.log(event)
                    setThemes(event.themes)
                    setTime(Date.now() + event.time)
                })
                socket.on(`theme_chosen_${link}` , function(event: any){
                    console.log('theme_chosen', event)
                    setValue(false)
                })
            }else{
                socket.on('join_game', (data: any) => {
                    dispatch(setInGameReducer(data))
                })
                socket.emit('get_questions', function(event: any){
                    console.log(event)
                    setQuestions(event.questions)
                    setTime(Date.now() + event.time)
                })       
                socket.on('end_sorting_questions', function(){
                    setValue(true)
                    navigate('/mobile_results/' + link, { state: {link: 'mobile_game'}})
                })  
                socket.on('end_of_round', function(event: any){
                    console.log('end_of_round ', event)
                    if(event.tour === 1) navigate('/mobile_results/' + link, { state: {link: 'mobile_final_round'}})
                    // if(event.tour === 1) navigate('/mobile_results/' + link, { state: {link: 'mobile_sorting'}})
                    else if(event.tour === 2)  navigate('/mobile_results/' +link, { state: {link: 'remove_excess'}})
                    else if(event.tour === 3)  navigate('/mobile_results/' +link, { state: {link: 'connections'}})
                })
            }
        }
    }, [socket&&value])
    


    function giveAnwer(index: number){
        socket.emit(`give_answer_quiz`, {index: index}, function(e: any){
            console.log(e)
            setCorrectVal({indx: index, value: e})
            setTimeout(() => {
                setCorrectVal({indx: 0, value: null})
                setNumb(numb+1)
            }, 800)
        })
    }

    function chooseTheme(index: number){
        socket.emit(`choose_theme`, {index: index}, function(e: any){
            console.log(e)
        })
    }

    return(
        <div className='mobile_game'>
            <div className='select_theme_container'>

                {value ? <div className='choose_theme regular'>
                    <h1>Гравці відповідатимуть на питання з категорії, яка набере найбілше голосів </h1>
                    <p>(за нічиєю комп’ютер обере випадкову категорію з лідерів опитування)</p>
                </div> 
                : <div className='choose_theme not_regular'> 
                     <h1>{question && question?.question}</h1> 
                 </div>}
            </div>
            <section className='choose_answer'>
                {value && <h1 className='select_theme'>Обери бажану</h1>}
                <div className='themes' style={!value ? {marginTop: '9.6vh'} : {}}>
                    {value ? themes.map((item: {name: string}, index: number) => (
                        <button 
                            style={ {background: correctVal.value === true&&correctVal.indx === index  ? 'green' : correctVal.value === false&&correctVal.indx === index ? 'red' : 'yellow' }} 
                            onClick={() => value ? chooseTheme(index) : giveAnwer(index)} key={index}>{item.name}</button>
                    ))
                    : question && question?.answers.map((item: {text: string, correct: boolean}, index: number) => (
                        <button 
                            style={ {background: correctVal.value === true&&correctVal.indx === index  ? 'green' : correctVal.value === false&&correctVal.indx === index ? 'red' : 'yellow' }} 
                            onClick={() => value ? chooseTheme(index) : giveAnwer(index)} key={index}>{item.text}</button>
                    ))}
                </div>
                {time > 0 &&
                <Countdown date={time} 
                    renderer={ ({seconds} : {seconds: number}) => <span className='theme_id theme_id_adapt'>{seconds}</span> } />}
            </section>
        </div>
    )
}