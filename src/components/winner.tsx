import Profile from '../assets/winner/profile.png'
import Star from '../assets/winner/star.png'

import '../styles/winner.scss'

export default function Winner(){

    return(
        <div className="winner">
            <h1 className='big_nameplate'>Вітаємо переможця</h1>
            <div className='winner_content'>
                <img src={Profile} alt="result" />
                <h3>Загадкова леді</h3>
            </div>
            <div className='result'>
                <img src={Star} alt="result" />
                <span>10</span>
            </div>
            <h2>Твій результат</h2>
        </div>
    )
}