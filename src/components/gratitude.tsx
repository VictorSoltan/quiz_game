import QRCode from "react-qr-code";

import '../styles/gratitude.scss'

export default function CallFriend(){

    return(
        <div className="gratitude">
            <h1 className='big_nameplate'>Дякуємо за гру</h1>
            <div className='gratitude_content'>
                <div>
                    <p>
                        Ми не клянчемо,<br/>
                        але як схочеш,<br/> 
                        то підтримай нас донатом
                    </p>
                    <button className='yellow_button'>донати</button>
                </div>
                <div className='qr_code'>
                    <QRCode 
                        viewBox={`0 0 256 256`} 
                        style={{ height: "auto", maxWidth: "90%", width: "90%" }} 
                        value={'/game_start/ds123'} 
                    />
                </div>
            </div>
        </div>
    )
}