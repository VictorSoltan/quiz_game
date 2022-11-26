import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik';
import Google from '../assets/google.svg'
import Fb from '../assets/fb.svg'
import {SocketContext} from '../context/socket';
import { useCookies } from 'react-cookie'
import { setSignedReducer } from '../redux/slices/signed';
import { useDispatch } from 'react-redux';

import '../styles/modal.scss'

export default function Modal({modalState, setModalState, setLogin} : {modalState: string, setModalState: any, setLogin: any}){

    const 
        loginWays = [Google, Fb],
        socket = useContext(SocketContext),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        [cookies, setCookie] = useCookies(['signature'])
    
    return(
        <div className='modal_window'>
            <div className='background' onClick={() => setModalState("")}/>
            <div className='modal'>
                <h1>{modalState === 'Reg' ? 'Реєстрація' : 'Увійти'}</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                      const errors = {} as any;
                      if (!values.email) {
                        errors.email = 'Required';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                      ) {
                        errors.email = 'Invalid email address';
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)
                        socket.emit(modalState === 'Reg' ? 'registrations' : 'login', { username: values.email, password: values.password}, function(event: any){
                            if(event === 'Welcome') { 
                              setCookie('signature', {username: values.email, password: values.password}, { path: '/' })
                              dispatch(setSignedReducer(true))
                              setModalState("")
                            }
                        })
                    }}
                  >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
                }) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">e-mail або номер телефону</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <label htmlFor="password">пароль</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                    />                
                    <div>
                        <button onClick={() => modalState === 'Reg' ? setModalState('Login') : setModalState('Reg')}>{modalState === 'Reg' ? 'в мене вже є аккаунт' : 'зареєструватися'}</button>
                        <button type="submit">{modalState === 'Reg' ?  'зареєструватися' : 'увійти'}</button>
                        {/* <button type="submit" onClick={() => {setLogin(true);  setModalState(""); navigate('/games')}}>{modalState === 'Reg' ?  'зареєструватися' : 'увійти'}</button> */}
                    </div>
                </form>
                )}  
                </Formik>

                <span>або увійти за допомогою соц. мереж</span>
                <footer>
                    {loginWays.map((el, index) => (
                        <img key={index} src={el} alt="login way" />
                    ))}
                </footer>
            </div>
        </div>
    )
}