
import { Outlet, useLocation } from 'react-router-dom'
import Background from '../assets/background.png'
import PhoneBackground from '../assets/phone/background.png'

import '../styles/in_app_component.scss'

export default function InAppComponent(){

    const location = useLocation(),
        location_dict:object = {
            profile: 'Мій аккаунт',
            games: 'Наші ігри'
        },
        pathname = location.pathname.replace('/', '') as any
    return(
        <div className='in_app_components' style={window.innerWidth > 768 ? { backgroundImage: `URL(${Background})`} : { backgroundImage: `URL(${PhoneBackground})`}}>
            <div className='banner_container'>
                <div className='banner'>
                    <h1>{location_dict[pathname as keyof object] ? location_dict[pathname as keyof object]  : 'Classic game' }</h1>
                </div>
                {(pathname === 'game_start' || pathname === 'mobile_waiting' || pathname === 'mobile_game') &&
                    <h1 className='tour'>1-й тур</h1>}
            </div>
            <Outlet />      
        </div>
    )
}