import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import MobileWaiting from './components/mobileWaiting'
import MobileGame from './components/mobileGame'

import './App.css';

function App() {

  const [modalState, setModalState] = useState<string>(""),
    [login, setLogin] = useState<Boolean>(false),
    [adaptMenu, setAdaptMenu] = useState<Boolean>(false)

  return (
    <div className="App">
      <Header modalState={modalState} setModalState={setModalState} login={login} adaptMenu={adaptMenu} setAdaptMenu={setAdaptMenu}/>
      {modalState&&!adaptMenu && <Modal modalState={modalState} setModalState={setModalState} setLogin={setLogin} />}
      <Routes>
      {/* {!login ? */}
        <Route path="/quiz_game" element={<MainScreen modalState={modalState} setModalState={setModalState} />} />
      {/* :  */}
        <Route path="/" element={<InAppComponent />} >
        <Route path="games" element={<Games />} />
        <Route path="profile" element={<Profile />} />
        <Route path="amount" element={<PlayersAmount />} />
        <Route path="qr_code" element={<CallFriend />} />
        <Route path="scan_qr" element={<ScanQr setLogin={setLogin} />} />
        <Route path="waiting" element={<WaitingFriends />} />
        <Route path="game_start/:id" element={<SelectTheme />} />
        <Route path="mobile_waiting" element={<MobileWaiting />} />
        <Route path="mobile_game" element={<MobileGame />} />
        </Route>
      {/* }  */}
      </Routes>
    </div>
  );
}

export default App;
