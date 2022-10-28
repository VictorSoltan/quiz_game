import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/logo.svg';
import Ava from '../assets/profile.svg';

import '../styles/header.scss';

export default function Header({modalState, setModalState, login, adaptMenu, setAdaptMenu} : {modalState: string; setModalState: any, login: Boolean, adaptMenu: Boolean, setAdaptMenu: any}) {
    
    const 
        menu = [
            {name:'наші ігри', link: '/games'}, {name:'івенти', link: '/games1'}, {name:'донати', link: '/games2'}
        ],
        adaptiveMenu = [
            {name:'Наші ігри', link: '/games'}, {name:'Івенти', link: '/games1'}, {name:'Донати', link: '/games2'}, {name:'Сканер QR', link: '/scan_qr'}
        ],
        location = useLocation()


    return(
        <div className='header'>
            <header>
                <div className='header_elem logo_elem'>
                    <div className={adaptMenu&&!modalState ? 'adaptive_menu activeMenu' : 'adaptive_menu'} onClick={() => {setAdaptMenu(!adaptMenu); setModalState(false)}}>
                        <div/>
                        <div/>
                        <div/>
                    </div>                    
                    <img src={Logo} alt="Logo" />
                    {menu.map((el, index) => (
                        <Link to={el.link} className={location.pathname === el.link ? 'yellow_button active' : 'yellow_button'} key={index}>{el.name}</Link>
                    ))}
                </div>
                <div className='header_elem profile_elem'>
                    <span>
                        {login ?
                        'Рома 123'
                        :
                        <>
                            <button onClick={() => {setModalState("Reg"); setAdaptMenu(false)}}>зареєструватися </button>
                            <span>/</span>
                            <button onClick={() => {setModalState("Login"); setAdaptMenu(false)}}>увійти</button> 
                        </>}
                    </span>
                    <Link to='/profile'><img src={Ava} alt="Avatar" /></Link>
                </div>
            </header>
            <div onClick={() => setAdaptMenu(!adaptMenu)} className={adaptMenu&&!modalState ? 'adaptiveMenu' : 'adaptiveMenu adaptiveMenuHidden'}>
                <div />
                {adaptiveMenu.map((item, index) => (
                    <Link key={index} to={item.link} className={location.pathname === item.link ? 'purple_button rev_active' : 'purple_button'}>{item.name}</Link>
                ))}
            </div>
        </div>
    )
}