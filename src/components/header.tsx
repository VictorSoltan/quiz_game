import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/logo.svg';
import Ava from '../assets/dogy.png';

import '../styles/header.scss';

export default function Header({modalState, setModalState, login} : {modalState: string; setModalState: any, login: Boolean}) {
    
    const menu = [
        {name:'наші ігри', link: '/games'}, {name:'івенти', link: '/games1'}, {name:'донати', link: '/games2'}],
        location = useLocation()

    return(
        <div className='header'>
            <header>
                <div>
                    <img src={Logo} alt="Logo" />
                    {menu.map((el, index) => (
                        <Link to={el.link} className={location.pathname === el.link ? 'yellow_button active' : 'yellow_button'} key={index}>{el.name}</Link>
                    ))}
                </div>
                <div>
                    <span>
                        {login ?
                        'Рома 123'
                        :
                        <>
                            <button onClick={() => setModalState("Reg")}>зареєструватися </button>
                             / 
                            <button onClick={() => setModalState("Login")}>увійти</button> 
                        </>}
                    </span>
                    <Link to='/profile'><img src={Ava} alt="Avatar" /></Link>
                </div>
            </header>
        </div>
    )
}