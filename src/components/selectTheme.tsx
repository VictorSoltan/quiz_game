

import '../styles/selectTheme.scss';
import Players from './players'

export default function SelectTheme(){

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
            <Players />
            <span className='theme_id theme_id_adapt'>5</span>    
        </div>
    )
}