import { useState, useEffect, useContext } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signedSelector } from '../redux/slices/signed';
import Dscrd from '../assets/dscrd.svg'
import Tg from '../assets/tg.svg'
import Viber from '../assets/viber.svg'
import Messanger from '../assets/messanger.svg'

import Copy from '../assets/copy.svg'
import Share from '../assets/share.svg'

import QRCode from "react-qr-code";
import {SocketContext} from '../context/socket';

import '../styles/callFriend.scss'

export default function CallFriend(){

    const social = [Dscrd, Tg, Viber, Messanger],
        navigate = useNavigate(),
        links = [
            {name: 'Посиланяя на гру:', link: 'smartfun/233.jfej/122vdvdbn...'},
            {name: 'Посиланяя на екран:', link: 'screencast/233.jfej/122vdvdbn...'}
        ],
        [players, setPlayers] = useState<Array<any>>([
            // {img: I1, name: 'Мари', ready: true},
            // {img: I2, name: 'Вика', ready: true},
            // {img: Uknown, name: '', ready: false},
            // {img: I3, name: 'ЕщеКтот', ready: true},
            // {img: Uknown, name: '', ready: false},
            // {img: I4, name: ')0)))', ready: true}
        ]),
        [amount, setAmount] = useState<number>(0),        
        socket = useContext(SocketContext),
        signed = useSelector(signedSelector.getSigned).signed

    function redirectToPage(){
        navigate("/waiting/" + window.location.pathname.replace('/qr_code/', ''))
    }

    useEffect(() => {
        if(socket&&signed){
            let link = window.location.pathname.replace('/qr_code/', '')
            socket.emit(`request_players`, {link: link}, function(event: any){
                console.log('event.room ', event)
                if(event) setPlayers(event.room); setAmount(event.amount)
            })
            console.log(`waiting_players_${link}`)
            socket.on(`waiting_players_${link}`, function(event: any){
                console.log(event)
                setPlayers(event.room)
            })
        }
    }, [socket, signed])    


    return(
        <div className="call_friend">
            <div className='h1_container'>
                <h1>Відскануй QR код та додавайся до гри !</h1>
            </div>
            <div className='players_online'>
                <h4>Підключено гравців:</h4>
                <span className='yellow_button'>{players.length}/{amount}</span>
            </div>
            <div className='qr_code'>
                <QRCode 
                    viewBox={`0 0 256 256`} 
                    style={{ height: "auto", maxWidth: "90%", width: "90%" }} 
                    value={window.location.origin + '/mobile_waiting/' + window.location.pathname.replace('/qr_code/', '')} 
                />
            </div>
            <button onClick={() => redirectToPage()} className='yellow_button room'>Кімната очікування</button>
            <footer>
                <div className='footer_elem'>
                    <button className='yellow_button'>Заділись грою з друзяками:</button>
                    <div>
                        {social.map((el, indx) => (
                            <img src={el} key={indx} alt="share via media" />
                        ))}
                    </div>
                </div>
                <div className='footer_elem'>
                    {links.map((el, indx) => (
                        <section key={indx}>
                            <span>{el.name}</span>
                            <div>
                                <input value={el.link} />
                                <div>
                                    <button><img src={Copy} alt="copy" /></button>     
                                    <button><img src={Share} alt="share" /></button>     
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </footer>
        </div>
    )
}