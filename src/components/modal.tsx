import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import Google from '../assets/google.svg'
import Fb from '../assets/fb.svg'
import '../styles/modal.scss'

export default function Modal({modalState, setModalState, setLogin} : {modalState: string, setModalState: any, setLogin: any}){

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const loginWays = [Google, Fb],
    navigate = useNavigate()
    
    return(
        <div className='modal_window'>
            <div className='background' onClick={() => setModalState("")}/>
            <div className='modal'>
                <h1>{modalState === 'Reg' ? 'Реєстрація' : 'Увійти'}</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">e-mail або номер телефону</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <label htmlFor="password">пароль</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />                
                    <div>
                        <button>{modalState === 'Reg' ? 'в мене вже є аккаунт' : 'зареєструватися'}</button>
                        <button type="submit" onClick={() => {setLogin(true);  setModalState(""); navigate('/games')}}>{modalState === 'Reg' ?  'зареєструватися' : 'увійти'}</button>
                    </div>
                </form>
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