import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/header'
import MainScreen from './pages/main_screen'

import Modal from './components/modal'

import InAppComponent from './pages/in_app_component'

import Games from './components/games'
import Profile from './components/profile'
import PlayersAmount from './components/playersAmount'
import CallFriend from './components/callFriend'
import WaitingFriends from './components/waitingFriends'

import './App.css';

function App() {

  const [modalState, setModalState] = useState<string>(""),
    [login, setLogin] = useState<Boolean>(false)

  return (
    <div className="App">
      <Header modalState={modalState} setModalState={setModalState} login={login} />
      {modalState && <Modal modalState={modalState} setModalState={setModalState} setLogin={setLogin}/>}
      <Routes>
      {!login ?
        <Route path="/" element={<MainScreen modalState={modalState} setModalState={setModalState} />} />
      :
       <Route path="/" element={<InAppComponent />} >
        <Route path="games" element={<Games />} />
        <Route path="profile" element={<Profile />} />
        <Route path="amount" element={<PlayersAmount />} />
        <Route path="qr_code" element={<CallFriend />} />
        <Route path="waiting" element={<WaitingFriends />} />
        </Route>
      }
      </Routes>
    </div>
  );
}

export default App;
