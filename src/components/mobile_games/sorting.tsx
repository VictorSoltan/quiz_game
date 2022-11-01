import { useNavigate } from "react-router-dom";

export default function SortingComponent({setState} : {setState: any}) {
    const answers = [
            'Кіно',
            'Серіал'
        ],
        navigate = useNavigate()

    return(
        <>
            <div className='yellow_button'>Кіно чи серіал ?</div>
            <h3>Володар перснів</h3>
            <p>Обери за назвою</p>
            <div className='answers' style={ answers.length>2 ? {width: '80%'} : {}}>
                {answers.map((item, index) => (
                    <div style={answers.length>2&&(index===0||index===3) ? {width: '100%'} : {}} key={index}>
                        <button onClick={() => {setState('remove'); navigate('/remove_excess')}} style={answers.length>2 ? {width: '102px', height: '102px'} : {}}>{item}</button>
                    </div>
                ))}
            </div>
        </>
    )
}