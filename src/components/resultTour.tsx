
import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'

import '../styles/resultTour.scss';

export default function ResultTour(){

    const players = [
        { img: I1, score: 3},
        { img: I3, score: 2},
        { img: I2, score: 3},
        { img: I4, score: 5},
        { img: I2, score: 0},
        { img: I4, score: 7}
    ]

    return(
        <div className='result_tour'>
            <h1>Результати:</h1>
            <div className='results'>
                {players.map((item, index) => (
                    <div key={index} className='result'>
                        <span>{item.score}</span>
                        <div className='score' style={{height: `${item.score*22}px`}} />
                        <img src={item.img} alt="profile score" />
                    </div>
                ))}
            </div>
        </div>  
    )
}