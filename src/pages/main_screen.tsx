import MainInfo from '../assets/mainInfo.png';
import PhoneInfo from '../assets/phone/back.png';

import Friends from '../assets/friends.svg';

import Discord from '../assets/discord.svg';
import Telegram from '../assets/telegram.svg';
import Insta from '../assets/insta.svg';

import '../styles/main_screen.scss';

export default function MainScreen({modalState, setModalState} : {modalState: string; setModalState: any}){

    const socialMedia = [Discord, Telegram, Insta]

    return(
        <section className="main_screen" style={{backgroundImage: `url(${MainInfo})`}}>
            <div className='mainInfo'>
                <div className='banner'>
                    <div>
                        <h3>Ласкаво просимо до</h3>
                        <h1>Smart-Fun</h1>
                    </div>
                    <img src={Friends} alt="friends" />
                </div>
                <section>
                    <p>
                        Інтерактивне дозвілля для друзів, 
                        що знаходяться на відстані, 
                        або навіть поруч
                    </p>
                    <h1>Тицяй на кнопку<br/>та починаємо</h1>
                    <button className='yellow_button' onClick={() => setModalState('Reg')}>зареєструватися</button>
                    <footer>
                        <img src={PhoneInfo} alt="phone image" className='phone_image' />
                        <span>Ми в соціальних мережах</span>
                        <div>
                            {socialMedia.map((el, indx) => (
                                <a key={indx} href="#"><img src={el} alt="social" /></a>
                            ))}
                        </div>
                    </footer>
                </section>
            </div>
        </section>
    )
}