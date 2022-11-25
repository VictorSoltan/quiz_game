import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'

export default function SelectTheme({players} : { players: Array<any> }){
        
    return(
        <div className='players'>
            {players && players.map((item, index) => (
                <div key={index}>
                    <img src={I1} alt="player" className='player' />
                    <span>{item.username}</span>
                </div>
            ))}
        </div>     
    )
}