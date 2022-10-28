import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'
import Uknown from '../assets/players/uknown.png'

import Vector from '../assets/players/Vector.svg'

import '../styles/mobileWaiting.scss'

export default function MobileWaiting(){

    const players = [
        {img: I1, name: 'Мари', ready: true},
        {img: I2, name: 'Вика', ready: true},
        {img: Uknown, name: 'Олекса', ready: false},
        {img: I3, name: 'ЕщеКтот', ready: true},
        {img: Uknown, name: 'Олекса', ready: false},
        {img: I4, name: ')0)))', ready: true}
    ]

    return(
        <div className="mobile_game">
            <h1>Готові до гри ?</h1>
            <div className='players'>
                {players.map((item, index) => (
                    <div key={index} style={item.ready ? {} : {opacity: '0.5'}}>
                        <img src={item.img} alt="player" className='player' />
                        {item.ready &&
                            <img src={Vector} alt="ready" className='vector'  />}
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
            <button className='yellow_button'>ТАК</button>
        </div>
    )
}