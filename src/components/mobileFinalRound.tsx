import { useState, useRef } from 'react';

import '../styles/mobileFinalRound.scss';

export default function MobileFinalRound(){
    const [ value, setValue ] = useState(100), 
        inputRef = useRef<HTMLInputElement>(null)

    // useEffect(() => {
        // inputRef.slider.getDOMNode().orient = 'vertical';

    // })

    return(
        <div className='mobile_final_round'>
            <div className='select_theme_container'>
                <p>У цьому раунді молодець той,<br/> хто дасть відповідь найближче до правильної</p>
            </div>
            <section className='choose_answer'>
                <h1 className='label'>В якому віці померла королева Англії, Єлизавета 2 ?</h1>
                <div className='choose_number'>
                    <div className='info'>
                        <span>Введи Число</span>
                        <input value={value} onChange={(e) => setValue(e.target.value as any)} />
                        <div className='slider_container'>
                        <div>
                            <h6>1</h6>
                            <span />
                        </div>
                        <input type="range" ref={inputRef} onChange={(e) => setValue(e.target.value as any)} min="1" max="200" value={value} className="slider" id="myRange" />
                        <div>
                            <h6>200</h6>
                            <span />
                        </div>  
                    </div>
                    <button className='yellow_button'>Готово</button>
                    </div>
                </div>                
                <h1 className='timer'>01:00</h1>
            </section>
        </div>
    )
}