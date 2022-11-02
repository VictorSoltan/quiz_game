import I1 from '../assets/phone/profile/1.png';
import I2 from '../assets/phone/profile/2.png';
import I3 from '../assets/phone/profile/3.png';
import I4 from '../assets/phone/profile/4.png';
import I5 from '../assets/phone/profile/5.png';
import I6 from '../assets/phone/profile/6.png';

import '../styles/mobileResults.scss';

export default function MobileResults(){
    
    const results = [
        {value: 7, profiles: [I1]},
        {value: 5, profiles: [I2]},
        {value: 3, profiles: [I3, I4, I5]},
        {value: 2, profiles: [I6]}
    ]
    
    return(
        <div className="mobile_results">
            <h1>Результати:</h1>
            <div className="results">
                {results.map((item, index) => (
                    <div key={index} className="result">
                        <div>
                            {item.profiles.map((item, indx) => (
                                <img src={item} key={indx} alt="profile" />
                            ))}
                        </div>
                        <span>{item.value}</span>
                    </div>

                ))}
            </div>
            <button className="yellow_button">Поїхали далі</button>
        </div>
    )
}