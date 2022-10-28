import Dscrd from '../assets/dscrd.svg'
import Tg from '../assets/tg.svg'
import Viber from '../assets/viber.svg'
import Messanger from '../assets/messanger.svg'

import Copy from '../assets/copy.svg'
import Share from '../assets/share.svg'

import QRCode from "react-qr-code";

import '../styles/callFriend.scss'

export default function CallFriend(){

    const social = [Dscrd, Tg, Viber, Messanger],
       
        links = [
            {name: 'Посиланяя на гру:', link: 'smartfun/233.jfej/122vdvdbn...'},
            {name: 'Посиланяя на екран:', link: 'screencast/233.jfej/122vdvdbn...'}
        ]

    return(
        <div className="call_friend">
            <div className='h1_container'>
                <h1>Відскануй QR код та додавайся до гри !</h1>
            </div>
            <div className='qr_code'>
                <QRCode 
                    viewBox={`0 0 256 256`} 
                    style={{ height: "auto", maxWidth: "90%", width: "90%" }} 
                    value={'/game_start/ds123'} 
                />
            </div>
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