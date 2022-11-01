import Players from './players'
import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'

import '../styles/question.scss'

export default function Question(){
    
    const answers = [
        'В амперах',
        'В Порошенках',
        'В вольтах',
        'В каденціях'
    ]

    const profile_answers = [
        [I1],
        [I1, I2, I3],
        [I3, I4],
        [],
    ]

    return(
        <div className="question">
            <h1>Результати:</h1>
            <div className='question_content'>
                <div className='question_banner'>
                    <h1>Як визначається<br/> сила струму ?</h1>
                </div>
                <div className='answers'>
                    <div style={{width: '65%'}}>
                        {answers.map((item, index) => (
                            <div key={index} className='answer_button'>
                                <button className='yellow_button' >{item}</button>
                                <span>
                                    {profile_answers[index].map((item, index) => (
                                        <img src={item} alt="player" />
                                    ))}
                                </span>
                            </div>
                        ))}
                    </div>
                    <span className='theme_id'>5</span>
                </div>
            </div>            
            <Players />
        </div>
    )
}