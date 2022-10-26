import { Link } from 'react-router-dom'
import I1 from '../assets/games/1.png'
import I2 from '../assets/games/2.png'
import I3 from '../assets/games/3.png'
import I4 from '../assets/games/4.png'
import I5 from '../assets/games/5.png'
import I6 from '../assets/games/6.png'

import DollarCircle from '../assets/games/dollar-circle.svg'

import '../styles/games.scss'

export default function Profile(){

    const user_info = [
        {name: 'Classic Game', img: I1, work: true, link: '/amount'},
        {name: 'Meme Game', img: I2, work: true, link: '/amount'},
        {name: '90’s Game', img: I3, work: true, link: '/amount'},
        {name: 'HFT Game', img: I4, work: false, link: '/amount'},
        {name: 'Mazhor Game', img: I5, work: false, link: '/amount'},
        {name: 'Alcohol Game', img: I6, work: false, link: '/amount'}
    ]

    return(
        <div className='games_container'>
            <div className='games'>
            {user_info.map((el, indx) => (
                <Link to={el.link}>
                    <div key={indx} style={ !el.work ? {opacity: '0.5'} : {opacity: '1', cursor: 'pointer'}}>
                        <div>
                            <img src={el.img} />
                            {!el.work && <img src={DollarCircle} className='dollar' />}
                        </div>
                        <span>{el.name}</span>
                    </div>                
                </Link>
            ))}
            </div>
            <button>Читай як грати </button>
        </div>
    )
}