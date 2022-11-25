import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {SocketContext} from '../../context/socket';

export default function Connection({setTime} : {setTime: any}) {

    const 
        [connectionsFirst, setConnectionsFirst] = useState<Array<any>>([]),
        [connectionsLast, setConnectionsLast] = useState<Array<any>>([]),
        navigate = useNavigate(),
        socket = useContext(SocketContext),
        answer = useRef<{value: string | undefined, value1: string | undefined}>({value: undefined, value1: undefined}),
        [correctValFirst, setCorrectValFirst] = useState<{title: string | undefined; value: boolean | null}>({title: '', value: null}),
        [correctValSecond, setCorrectValSecond] = useState<{title: string | undefined; value: boolean | null}>({title: '', value: null})

    useEffect(() => {
        if(socket){
            let link = window.location.pathname.replace('/connections/', '')
            socket.emit('get_connections', function(e: any){
                setConnectionsFirst(e.connections_first)
                setConnectionsLast(e.connections_last)
                setTime(Date.now() + e.time)
            })
            socket.on('end_sorting_connections', function(e: any){
                navigate('/mobile_results/' + link, { state: {link: 'mobile_final_round'}})
            })    
        }
    }, [socket])        

    function giveAnswer(value: string, index: number){
        if(index) answer.current.value = value
        else answer.current.value1 = value
        if(answer.current.value&&answer.current.value1){
            socket.emit('connect_values', {value: answer.current.value, value1: answer.current.value1}, function(e: any){
                console.log(e)
                const index = connectionsFirst.findIndex(object => {
                    return object === answer.current.value;
                });

                const index1 = connectionsLast.findIndex(object => {
                    return object === answer.current.value1;
                });


                setCorrectValFirst({title: answer.current.value, value: e})
                setCorrectValSecond({title: answer.current.value1, value: e})

                setTimeout(() => {
                    setCorrectValFirst({title: '', value: null})
                    setCorrectValSecond({title: '', value: null})
                                       
                    if(e) {
                        setConnectionsFirst([
                            ...connectionsFirst.slice(0, index),
                            ...connectionsFirst.slice(index + 1)
                        ])
                        setConnectionsLast([
                            ...connectionsLast.slice(0, index1),
                            ...connectionsLast.slice(index1 + 1)
                        ])                    
                    }     

                }, 800)         
            answer.current.value = undefined
                answer.current.value1 = undefined
            })
        }
    }

    return(
        <>
            <h4>З’єднай пов’язане</h4> 
            <div className='choose_film_hero'>
                <div>
                    <span>Головний герой</span>
                    <span>Фільм</span>
                </div>
                <div className='connections'>
                    <div className='left'>
                        {connectionsFirst.slice(0, 3).map((item, index) => (
                            <button key={index} 
                                style={{background: correctValFirst.value === true&&correctValFirst.title === item  ? 'green' : correctValFirst.value === false&&correctValFirst.title === item ? 'red' : 'yellow' }} 
                                onClick={() => giveAnswer(item, 1)} >{item}</button>
                        ))}
                    </div>
                    <div className='right'>
                        {connectionsLast.slice(0, 3).map((item, index) => (
                            <button key={index} 
                                style={{background: correctValSecond.value === true&&correctValSecond.title === item  ? 'green' : correctValSecond.value === false&&correctValSecond.title === item ? 'red' : 'yellow' }}
                                onClick={() => giveAnswer(item, 0)} >{item}</button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
