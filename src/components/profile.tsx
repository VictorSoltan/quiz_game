import Avatar from '../assets/Avatar.png'

import '../styles/profile.scss'

export default function Profile(){

    const user_info = [
        {name: 'ім’я:', value: 'Рома 123'},
        {name: 'email:', value: 'roma123@gmail.com'},
        {name: 'тел.', value: '+ 38 095 998 454 32 32'}
    ]
    
    return(
        <div className='component'>
            <div className='user_info_container'>
                <div className='user_info'>
                    {user_info.map((el, indx) => (
                        <div key={indx}>
                            <span>{el.name}</span>
                            <span>{el.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='profile_photo'>
                <img src={Avatar} alt="Avatar" />
            </div>
        </div>
    )
}