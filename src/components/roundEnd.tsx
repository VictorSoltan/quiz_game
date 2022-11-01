import Players from './players'

import '../styles/roundEnd.scss';

export default function RoundEnd(){
    return(
        <div className="round_end">
            <h1>Раунд <span>Сорування</span></h1>
            <div className='message'>У гравців є одна хвилина,<br/>аби дати якомога більше правильних відповідей</div>
            <h2 className='timer'>01:00</h2>
            <Players />
        </div>
    )
}