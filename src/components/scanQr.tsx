import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Camera from '../assets/phone/camera.svg';
import Borders from '../assets/phone/borders.png';
import Qr from '../assets/phone/qr.png';

import { QrReader } from 'react-qr-reader';
import { Result } from "@zxing/library";

import '../styles/scanQr.scss';

export default function ScanQr({setLogin} : {setLogin: any}){

  const 
    delay = 500,
    [scanner, setScanner] = useState<Boolean>(false),
    [data, setData] = useState(""),
    // [error, setError] = useState(""),
    handleScan = (
    result: Result | undefined | null,
    error: Error | undefined | null
  ) => {
    if (!!result) {
      setData(result?.getText());
      // TODO: We can redirect here to another
      // page since we have the result.
    } else {
      setData("");
    }
    if (!!error) {
      // setError(error?.message);
    } else {
      // Reset the error since we don't
      // need it to be displayed as constant
      // error - only while it's occurring.
      // setError("");
    }
  },
  navigate = useNavigate()

	useEffect(() => {
    if(data){
      setLogin(true)
      navigate(data.replace(`${window.location.origin}/quiz_game/#`, ''))
      console.log(data)
    }
	}, [data])

  return(
    <div className='scan_qr'>
      <div className='label'><h1>Та починай грати</h1></div>
      {scanner ? <div className='borders' style={{backgroundImage: `url(${Borders})` }}>
        <QrReader
            className={"videoStyle"}
            constraints={{
              facingMode: { ideal: "environment" }
            }}
            scanDelay={delay}
            onResult={handleScan}
        />
        </div> :
          <img src={Qr} alt="qr scan" className='qr'/>}
          <button onClick={() => setScanner(!scanner)}><img src={Camera} alt="camera" /></button>
          <span>Використай камеру</span>
      </div>
  )
}