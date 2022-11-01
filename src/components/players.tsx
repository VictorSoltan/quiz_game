import I1 from '../assets/players/1.png'
import I2 from '../assets/players/2.png'
import I3 from '../assets/players/3.png'
import I4 from '../assets/players/4.png'

export default function SelectTheme(){

    const players = [
        { img: I1, name: 'Мари'},
        { img: I3, name: 'ЕщеКтот'},
        { img: I2, name: 'Вика'},
        { img: I4, name: ')0)))'},
        { img: I2, name: 'Вика'},
        { img: I4, name: ')0)))'}
    ]
        
    return(
        <div className='players'>
            {players.map((item, index) => (
                <div key={index}>
                    <img src={item.img} alt="player" className='player' />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>     
    )
}