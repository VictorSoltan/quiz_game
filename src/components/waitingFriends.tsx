import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'
import Uknown from '../assets/players/uknown.png'

import Vector from '../assets/players/Vector.svg'

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
            <div className='players_banner'>
                <h1>Очікуємо гравців...</h1>
            </div>
            <div className='players'>
                {players.map((item, index) => (
                    <div key={index}>
                        <img src={item.img} alt="player" className='player' />
                        <span>{item.name}</span>
                        {item.ready &&
                            <img src={Vector} alt="ready" />}
                    </div>
                ))}
            </div>
        </div>
    )
}