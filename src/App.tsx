import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { setSignedReducer } from './redux/slices/signed';
import { useDispatch } from 'react-redux';

import Header from './components/header'
import MainScreen from './pages/main_screen'

import Modal from './components/modal'

import InAppComponent from './pages/in_app_component'

import Games from './components/games'
import Profile from './components/profile'
import PlayersAmount from './components/playersAmount'
import CallFriend from './components/callFriend'
import ScanQr from './components/scanQr'
import WaitingFriends from './components/waitingFriends'
import SelectTheme from './components/selectTheme'
import Question from './components/question'

import RoundEnd from './components/roundEnd'

import ResultTour from './components/resultTour'

import MobileProfile from './components/mobileProfile'

import MobileWaiting from './components/mobileWaiting'
import MobileGame from './components/mobileGame'
import Sorting from './components/sorting'
import MobileFinalRound from './components/mobileFinalRound'


import MobileResults from './components/mobileResults'


import FinalRound from './components/finalRound'
import Results from './components/results'
import Winner from './components/winner'
import Gratitude from './components/gratitude'
import { useCookies } from 'react-cookie'
import {SocketContext, connectSocket} from './context/socket';
import { signedSelector } from './redux/slices/signed';
import { useSelector } from 'react-redux'

import './App.css';

function App() {

  const 
    [modalState, setModalState] = useState<string>(""),
    [login, setLogin] = useState<Boolean>(false),
    [adaptMenu, setAdaptMenu] = useState<Boolean>(false),
    [socket, setSocket] = useState<any>(null),
    [cookies] = useCookies(['signature']),
    location = useLocation(),
    signed = useSelector(signedSelector.getSigned).signed,
    dispatch = useDispatch();

    useEffect(() => {
      if(!socket) setSocket(connectSocket())
      if(socket){
        if (cookies.signature){
          let cookie : any = cookies.signature
          console.log('login ', cookie) 
          socket.emit('login', {cookie}, function(event: any){
            console.log('login', event)
            if(event==='Welcome') dispatch(setSignedReducer(true))

          })
        }
      }
      return () => {
        if(socket) socket.emit('disconnect') 
      }
    }, [socket])

    useEffect(() => {
      if(!signed){
        if(location.pathname.includes("mobile_waiting")) setModalState("Reg")
      }else setModalState("")
    }, [signed])

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Header modalState={modalState} setModalState={setModalState} login={login} adaptMenu={adaptMenu} setAdaptMenu={setAdaptMenu}/>
        {modalState&&!adaptMenu && <Modal modalState={modalState} setModalState={setModalState} setLogin={setLogin} />}
        <Routes>
        {!signed ?
            <>
              <Route path="/" element={<MainScreen modalState={modalState} setModalState={setModalState} />} />
              <Route path="mobile_waiting/:id" element={<MainScreen modalState={modalState} setModalState={() => setModalState('Reg')} />} />
            </>
        :  
          <Route path="/" element={<InAppComponent />} >
          <Route path="/" element={<Games />} />
          <Route path="profile" element={<Profile />} />
          <Route path="amount" element={<PlayersAmount />} />
          <Route path="qr_code/:id" element={<CallFriend />} />
          <Route path="scan_qr" element={<ScanQr setLogin={setLogin} />} />
          <Route path="waiting/:id" element={<WaitingFriends />} />
          <Route path="game_start/:id" element={<SelectTheme />} />
          <Route path="question/:id" element={<Question />} />
          <Route path="round_end/:id" element={<RoundEnd />} />


          <Route path="result_tour/:id" element={<ResultTour />} />

          <Route path="mobile_profile" element={<MobileProfile />} />
          <Route path="mobile_waiting/:id" element={<MobileWaiting />} />
          <Route path="mobile_game/:id" element={<MobileGame />} />
          {["mobile_sorting/:id", "remove_excess/:id", "connections/:id"].map((path, index) => (
            <Route key={index}  path={path} element={<Sorting />} />
          ))}

          
          <Route path="mobile_final_round/:id" element={<MobileFinalRound />} />

          <Route path="mobile_results/:id" element={<MobileResults />} />

          <Route path="final_round/:id" element={<FinalRound />} />
          <Route path="results/:id" element={<Results />} />
          <Route path="winner" element={<Winner />} />
          <Route path="gratitude" element={<Gratitude />} />
          </Route>
        } 
        </Routes>
      </div>
    </SocketContext.Provider>
  
  );
}

export default App;
