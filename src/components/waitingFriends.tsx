import { Link } from 'react-router-dom'
import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'
import Uknown from '../assets/players/uknown.png'

import Vector from '../assets/players/Vector.svg'

import QRCode from "react-qr-code";

import '../styles/waitingFriends.scss'

export default function WaitingFriends(){

    const players = [
        {img: I1, name: 'Мари', ready: true},
        {img: I2, name: 'Вика', ready: true},
        {img: Uknown, name: '', ready: false},
        {img: I3, name: 'ЕщеКтот', ready: true},
        {img: Uknown, name: '', ready: false},
        {img: I4, name: ')0)))', ready: true}
    ]

    return(
        <div className='waiting_friends'>
            <div className='waiting_friends_content'>
                <div className='players_banner'>
                    <div/>
                    <h1>Очікуємо гравців...</h1>
                </div>
                <div className='qr'>
                    <div className='qr_code'>
                        <QRCode 
                            viewBox={`0 0 256 256`} 
                            style={{ height: "auto", maxWidth: "90%", width: "90%" }} 
                            value={'/game_start/ds123'} 
                        />
                    </div> 
                    <Link to="/qr_code" className='yellow_button'>Кімната підключення</Link>
                </div>
            </div>
            <div className='waiting_players'>
                {players.map((item, index) => (
                    <div key={index} style={!item.ready ? {opacity: '0.7'} : {}}>
                        <img src={item.img} alt="player" className='player' />
                        <span>{item.ready ? item.name : 'Гравець ' + index+1}</span>
                        {!item.ready && <h6>ще чекаємо</h6>}
                        {item.ready &&
                            <img src={Vector} alt="ready" />}
                    </div>
                ))}
            </div>
        </div>
    )
}