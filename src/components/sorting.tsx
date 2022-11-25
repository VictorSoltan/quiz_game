import { useState } from 'react'
import '../styles/sorting.scss';
import { useLocation  } from 'react-router-dom';
import SortingComponent from './mobile_games/sorting'
import RemoveTheExcess from './mobile_games/removeTheExcess'
import Connections from './mobile_games/connections'

import Countdown from 'react-countdown';


export default function Sorting() {
    const 
        [questions, setQuestions] = useState<Array<any>>([]),
        [time, setTime] = useState<number>(0),
        location = useLocation()
        const path = location.pathname.slice(0, -9)
        
    return(
        <div className='sorting'>
            <div className='select_theme_container'>
                <p>У вас є одна хвилина,<br/>
                    аби дати якомога більше правильних відповідей</p>
            </div>
            <section className='choose_answer'>
                {path === '/mobile_sorting' ? <SortingComponent setTime={setTime}/>
                : path === '/remove_excess' ? <RemoveTheExcess setTime={setTime} />
                : path === '/connections' && <Connections setTime={setTime} />}
                {time > Date.now() &&
                    <Countdown date={time} 
                        renderer={ ({minutes, seconds} : {minutes: number; seconds: number}) => <h1 className='timer'>{minutes}:{seconds}</h1> } />}
            </section>
        </div>
    )
}