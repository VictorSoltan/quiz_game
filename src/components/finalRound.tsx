import I1 from '../assets/players/1.png'
import '../styles/finalRound.scss'

export default function FinalRound(){

    return(
        <div className="final_round">
            <div className='final'>
                <div>
                    <h1>Фінальний раунд</h1>
                    <p>У цьому раунді молодець той,<br/>хто дасть відповідь найближче до правильної</p>
                </div>
                <span className='timer'>01:00</span>
            </div>
            <h3 className='average_nameplate'>В якому віці померла королева Англії, Єлизавета 2 ?</h3>
            <div className='results'>
                <div className='border'>
                    <span>1</span>
                </div>
                <div className='yellow_line'>
                    <div className='player_answer' style={{left: `calc(${93}%/ 2 )`}}>
                        <img src={I1} alt="profile" />
                        <span>93</span>
                    </div>
                    <div className='answer' style={{left: `calc(${96}%/ 2 )`}}>
                        <span>96</span>
                    </div>
                </div>
                <div className='border'>
                    <span>200</span>
                </div>
            </div>
        </div>
    )
}