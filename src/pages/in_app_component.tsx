
import { Outlet, useLocation } from 'react-router-dom'
import Background from '../assets/background.png'

import '../styles/in_app_component.scss'

export default function InAppComponent(){

    const location = useLocation(),
        location_dict:object = {
            profile: 'Мій аккаунт',
            games: 'Наші ігри'
        },
        pathname = location.pathname.replace('/', '') as any


    return(
        <div className='in_app_components' style={{ backgroundImage: `URL(${Background})`}}>
            <div className='banner'>
                <h1>{location_dict[pathname as keyof object] ? location_dict[pathname as keyof object]  : 'Classic game' }</h1>
            </div>
            <Outlet />      
        </div>
    )
}