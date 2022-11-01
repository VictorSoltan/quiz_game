import { useState } from 'react'
import '../styles/sorting.scss';

import SortingComponent from './mobile_games/sorting'
import RemoveTheExcess from './mobile_games/removeTheExcess'
import Connections from './mobile_games/connections'


export default function Sorting() {
    const 
        [state, setState] = useState('sorting'),
        answers = [
            'Чужий',
            'Я плюю на ваші могили',
            'Шоу Трумана',
            'Хоббіт'
        ]


    return(
        <div className='sorting'>
            <div className='select_theme_container'>
                <p>(за нічиєю комп’ютер обере випадкову категорію з лідерів опитування)</p>
            </div>
            <section className='choose_answer'>
                {state === 'sorting' ? <SortingComponent setState={setState} />
                : state === 'remove' ? <RemoveTheExcess setState={setState} />
                : state === 'connections' && <Connections />}
                <h1 className='timer'>01:00</h1>
            </section>
        </div>
    )
}