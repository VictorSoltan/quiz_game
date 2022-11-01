import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import I1 from '../assets/phone/profile/1.png';
import I2 from '../assets/phone/profile/2.png';
import I3 from '../assets/phone/profile/3.png';
import I4 from '../assets/phone/profile/4.png';
import I5 from '../assets/phone/profile/5.png';
import I6 from '../assets/phone/profile/6.png';

import Camera from '../assets/phone/camera.svg';
import Ava from '../assets/profile.svg';

import '../styles/mobileProfile.scss';

export default function MobileProfile(){

    const profile_imgs = [I1, I2, I3, I4, I5, I6],
    [selectedImage, setSelectedImage] = useState<any>(null),
    [image, setImage] = useState<any>(Ava),
    inputRef = useRef<any>(null);
    
    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    
    return(
        <div className="mobile_profile">
            <h6>Введи ім’я:</h6>
            <input />
            <h6>Та обери фото:</h6>
            <div className="photo_slider">
                <div>
                    {profile_imgs.map((item, index) => (
                        <img onClick={() => {setSelectedImage(null); setImage(item)}} src={item} key={index} alt="profile img" />
                    ))}
                </div>
            </div>
            <h6>Або завантаж своє:</h6>
            <div className='choose_photo'>
                <button onClick={handleClick} className='yellow_button'>
                    <img src={Camera} alt="camera" />
                    Додати фото
                </button>
                <input
                  type="file"
                  name="myImage"
                  ref={inputRef}
                  onChange={e => setSelectedImage(e.target.files)}
                  accept=".jpg,.png"
                />
                <img src={selectedImage ? URL.createObjectURL(selectedImage[0]) : image} alt="profile photo" className='profile_photo'/>
            </div>
            <Link to="/mobile_waiting" className='yellow_button ready'>Готово</Link>
        </div>
    )
}