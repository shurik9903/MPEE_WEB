import React, {useEffect, useState, useRef, useContext} from 'react';

import {Start_module} from './module/start_page_module';
import {Login_module} from '../login/module/Login';
import {Registration_module} from '../registration/module/Registration';
import {useNavigate} from "react-router-dom";

import {UserData_module}  from '../module/UserData';

import page_style from '../css/start_page_style.css';
import my_style from '../css/my_style.css';


function Start_Form() {

    const [info, setInfo] = useState('');
    const {LogIn, SignUp} = useStart();

    useEffect(() => {
        console.log('Start_Form::componentDidMount');

        return () => {
            console.log('Start_Form::componentWillUnmount');
        };
    },[]);
 
    return (
            <>
                <div className={page_style.E_head}>
                    <div>Авторизация</div>
                </div>
                <div className={page_style.E_main}></div>
                <div className={page_style.E_info}>
                    <div className={page_style.text_info}>
                        {info}
                    </div>
                </div>
                <div className={page_style.E_button}>
                    <div className={`${page_style.log_in_form_button} ${my_style.my_button}`} onClick={LogIn}>Log in</div>
                    <div className={`${page_style.sign_up_form_button} ${my_style.my_button}`} onClick={SignUp}>Sign up</div>
                </div>
            </>
    );

};


function Login_Form() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [disable, setDisable] = useState('');

    const {Back} = useStart();

    const navigate = useNavigate();

    const LoginClick = () => {

        setDisable(true);
            
        let LoginData = {
            login: login,
            password: password
        };
                        
        let promise = Login_module.Login_async(LoginData);
            
        promise.then(
            result => navigate('/work'),
            error => setInfo(`${error}`)
        ).finally(()=>setDisable(false));
        
    };

    useEffect(() => {
        console.log('Login_Form::componentDidMount');

        return () => {
            console.log('Login_Form::componentWillUnmount');
        };
    },[]);

    return (
            <>
                <div className={page_style.E_head}>
                        <div>Авторизация</div>
                </div>
                <div className={page_style.E_main}>
                    <div className={page_style.log_in_form}>
                        <div className={page_style.input_log_in}>
                            <p>Логин</p>
                            <input type="text" size="25" className={page_style.name_log_in} value={login} onChange={() => setLogin(event.target.value)}/>
                        </div>
                        <div className={page_style.input_pass}>
                            <p>Пароль</p>
                            <input type="text" size="25" className={page_style.pass_log_in} value={password} onChange={() => setPassword(event.target.value)}/>
                        </div>
                    </div>  
                </div>
                <div className={page_style.E_info}>
                    <div className={page_style.text_info}>
                        {info}
                    </div>
                </div>
                <div className={page_style.E_button}>
                    <div className={`${page_style.back_button} ${my_style.my_button}`} onClick={Back}>Назад</div>
                    <div className={`${page_style.log_in_button} ${my_style.my_button}`} disabled={disable} onClick={LoginClick}>Войти</div>
                </div>
            </>
    );
};

function Regist_Form() {

    const [mail, setMail] = useState('');
    const [login, setLogin] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [info, setInfo] = useState('');
    const [disable, setDisable] = useState('');
    
    const {Back} = useStart();

    const RegistClick = () => {
        setDisable(true);
        
        let RegData = {
            email: mail,
            username: login,
            password: password1,
            password2: password2
        };

        let promise = Registration_module.Registration_async(RegData);

        promise.then(
            result => setInfo(`${result}`),
            error => setInfo(`${error}`)
        ).finally(()=>
            setDisable(false)
        );
    };


    useEffect(() => {
        console.log('Reg_Form::componentDidMount');

        return () => {
            console.log('Reg_Form::componentWillUnmount');
        };
    },[]);

    return (
            <>
                <div className={page_style.E_head}>
                    <div>Авторизация</div>
                </div>
                <div className={page_style.E_main}>
                    <div className={page_style.sign_up_form}>
                        <div className={page_style.input_email}>
                            <p>Почта</p>
                            <input type="text" size="25" className={page_style.email_sign_up} value={mail} onChange={() => setMail(event.target.value)}/>
                        </div>
                        <div className={page_style.input_login}>
                            <p>Логин</p>
                            <input type="text" size="25" className={page_style.login_sign_up} value={login} onChange={() => setLogin(event.target.value)}/>
                        </div>
                        <div className={page_style.input_pass1}>
                            <p>Пароль</p>
                            <input type="text" size="25" className={page_style.pass1_sign_up} value={password1} onChange={() => setPassword1(event.target.value)}/>
                        </div>
                        <div className={page_style.input_pass2}>
                            <p>Повторите пароль</p>
                            <input type="text" size="25" className={page_style.pass2_sign_up} value={password2} onChange={() => setPassword2(event.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className={page_style.E_info}>
                    <div className={page_style.text_info}>
                        {info}
                    </div>
                </div>
                <div className={page_style.E_button}>
                    <div className={`${page_style.back_button} ${my_style.my_button}`} onClick={Back}>Назад</div>
                    <div className={`${page_style.sign_up_button} ${my_style.my_button}`} disabled={disable} onClick={RegistClick}>Зарегистрироваться</div>
                </div>
            </>
    );
};

const StartContext = React.createContext();

const useStart = () => {
    return useContext(StartContext);
}

const StartProvider = ({children}) => {
    const [page, setPage] = useState()

    useEffect(() => {
        setPage(<Start_Form/>);
    },[]);

    return (
        <StartContext.Provider value={{
            Back:() => setPage(<Start_Form/>),
            LogIn:() => setPage(<Login_Form/>),
            SignUp:() => setPage(<Regist_Form/>)
        }}>
            { page }
        </StartContext.Provider>
    );
};

function Start_Page() {
    console.log('start_page::constructor');    

    const star = useRef(null);

    const setStarRef = (element) => {
        star.current = element
    };

    useEffect(() => {
        console.log('start_page::componentDidMount');
        Start_module.Start(star.current);

        UserData_module.refreshData();

        return () => {
            console.log('start_page::componentWillUnmount');
        };

    },[]);

    return (
        <div className={page_style.wrapper}>
            <div className={page_style.back}>
                <div className={`${page_style.head} ${page_style.border_gradient}`}>
                    <div>СиММиР</div>
                </div>
                <div className={page_style.main} ref={setStarRef}>
                    <div className={`${page_style.entry} ${page_style.border_gradient}`}>
                        <StartProvider/>
                    </div>
                </div>
                <div className={`${page_style.footer} ${page_style.border_gradient}`}>
                    <div>Информация</div>
                </div>   
            </div>
        </div>
    );

};

export default Start_Page;
