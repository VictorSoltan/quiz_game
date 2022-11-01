
import { Outlet, useLocation } from 'react-router-dom'
import Background from '../assets/background.png'
import PhoneBackground from '../assets/phone/background.png'

import '../styles/in_app_component.scss'

export default function InAppComponent(){

    const location = useLocation(),
        location_dict:object = {
            profile: 'Мій аккаунт',
            games: 'Наші ігри',
            scan_qr: 'Відскануй QR код',
            mobile_profile: 'Як тебе звати ?',
            mobile_waiting: 'Очікуємо гравців',
            mobile_game: 'Цікаві факти',
            mobile_sorting: 'Сортування',
            connections: 'Зв’язки',
            remove_excess: 'Прибери зайве',
            mobile_final_round: 'Фінальний раунд'
        },
        location_label:object = {
            game_start: '1-й тур',
            question: '1-й тур',
            mobile_waiting: '5/6',
            mobile_game: '1-й тур',
            mobile_sorting: '1-й тур',
            connections: '3-й тур',
            remove_excess: '2-й тур',
            mobile_final_round: '1-й тур',
            final_round: '3-й тур',
            results: '3-й тур',
            result_tour: '1-й тур',
            round_end: '1-й тур'
        },

        pathname = location.pathname.replace('/', '') as any
    return(
        <div className='in_app_components' style={window.innerWidth > 768 ? { backgroundImage: `URL(${Background})`} : { backgroundImage: `URL(${PhoneBackground})`}}>
            <div className='banner_container'>
                <div className='banner'>
                    <h1>{location_dict[pathname as keyof object] ? location_dict[pathname as keyof object]  : 'Classic game' }</h1>
                </div>
                <h1 className='tour'>{location_label[pathname as keyof object] ? location_label[pathname as keyof object]  : '' }</h1>
            </div>
            <div className='content'>
                <Outlet />      
            </div>
        </div>
    )
}