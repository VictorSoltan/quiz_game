import { useNavigate } from 'react-router-dom'
export default function Connection() {

    const answers1 = [
        {hero: 'Кіно', movie: 'Аватар'},
        {hero: 'Кіно', movie: 'Аватар'},
        {hero: 'Серіал', movie: 'Аватар'}
    ],
    navigate = useNavigate()

    return(
        <>
            <h4>З’єднай пов’язане</h4> 
            <div className='choose_film_hero'>
                <div>
                    <span>Головний герой</span>
                    <span>Фільм</span>
                </div>
                {answers1.map((item, index) => (
                    <div key={index}>
                        <button onClick={() => navigate('/mobile_final_round')} >{item.hero}</button>
                        <button onClick={() => navigate('/mobile_final_round')} >{item.movie}</button>
                    </div>
                ))}
            </div>
        </>
    )
}
