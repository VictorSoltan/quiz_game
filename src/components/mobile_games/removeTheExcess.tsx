import { Route } from 'react-router-dom'

export default function RemoveTheExcess({setState} : {setState: any}) {
    const answers = [
            'Чужий',
            'Я плюю на ваші могили',
            'Шоу Трумана',
            'Хоббіт'
        ]


    return(
        <>
            <h4>Який з цих фільмів комедія ?</h4> 
            <div className='answers' style={ answers.length>2 ? {width: '80%'} : {}}>
                {answers.map((item, index) => (
                    <div style={answers.length>2&&(index===0||index===3) ? {width: '100%'} : {}} key={index}>
                        <button onClick={() => setState('connections')} style={answers.length>2 ? {width: '102px', height: '102px'} : {}}>{item}</button>
                    </div>
                ))}
            </div>        
        </>
    )
}