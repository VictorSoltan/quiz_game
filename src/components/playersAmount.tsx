import { useState } from 'react'
import { Link } from 'react-router-dom'
import I1 from '../assets/1.png'

import '../styles/playersAmount.scss'

export default function PlayerAmount(){

    const [amount, setAmount] = useState<number>(2)

    return(
        <div className="player_amount">
            <div className='choose_amount_container'>
                <div className='choose_amount'>
                    <h1>Обирай кількість гравців та GO !</h1>
                    <div>
                        <button onClick={() => amount > 2 && setAmount(amount-1)}>-</button>
                        <span>{amount}</span>
                        <button onClick={() => amount < 8 && setAmount(amount+1)}>+</button>
                    </div>
                    <Link to="/qr_code" className='yellow_button amount_button'>Розпочати</Link>
                </div>
            </div>
            <div className='choosen_game'>
                <img src={I1} alt="choosen game"/>
                <span>{'Classic game'}</span>
            </div>
        </div>
    )
}