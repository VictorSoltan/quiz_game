import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'

import '../styles/selectTheme.scss';

export default function SelectTheme(){

    const players = [
        { img: I1, name: 'Мари'},
        { img: I3, name: 'ЕщеКтот'},
        { img: I2, name: 'Вика'},
        { img: I4, name: ')0)))'},
        { img: I2, name: 'Вика'},
        { img: I4, name: ')0)))'}
    ]

    const themes = [
        'Технології та IT',
        'Цікаві факти',
        'Історія України',
        'Кіно та серіали'
    ]

    return(
        <div className='select_theme'>
            <div className='select_theme_container'>
                <div className='choose_theme'>
                    <h1>Гравці відповідатимуть на питання з категорії, яка набере найбілше голосів</h1>
                    <p>(за нічиєю комп’ютер обере випадкову категорію з лідерів опитування)</p>
                </div>
                <span className='theme_id'>5</span>
            </div>
            <h1 className='select_theme'>Обери бажану</h1>
            <div className='themes'>
                {themes.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
            {false && <div className='theme'>
                <span>5</span>
                <div>Цікаві факти</div>
                <span>5</span>
            </div>}
            <div className='players'>
                {players.map((item, index) => (
                    <div key={index}>
                        <h6>1</h6>
                        <img src={item.img} alt="player" className='player' />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>        
            <span className='theme_id theme_id_adapt'>5</span>    
        </div>
    )
}