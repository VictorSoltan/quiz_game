import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mobileGame.scss';

export default function MobileGame(){

    const themes = [
        'Кіно та серіали',
        'Історія України',
        'Цікаві Факти',
        'Технології та IT'
    ],
    [value, setValue] = useState(true),
    navigate = useNavigate()

    return(
        <div className='mobile_game'>
            <div className='select_theme_container'>

                {value ? <div className='choose_theme regular'>
                    <h1>Гравці відповідатимуть на питання з категорії, яка набере найбілше голосів </h1>
                    <p>(за нічиєю комп’ютер обере випадкову категорію з лідерів опитування)</p>
                </div> 
                : <div className='choose_theme not_regular'> 
                     <h1>Як визначається сила струму ?</h1> 
                 </div>}
            </div>
            <section className='choose_answer'>
                {value && <h1 className='select_theme'>Обери бажану</h1>}
                <div className='themes' style={!value ? {marginTop: '9.6vh'} : {}}>
                    {themes.map((item, index) => (
                        <button onClick={() => !value ? navigate('/mobile_sorting') : setValue(false)} key={index}>{item}</button>
                    ))}
                </div>
                <span className='theme_id theme_id_adapt'>5</span>    

            </section>
        </div>
    )
}