import React, {useEffect, useState, useContext} from 'react';

import {Start_module} from './module/start_page_module';
import {Login_module} from '../login/module/Login';
import {Registration_module} from '../registration/module/Registration';
import { useNavigate } from "react-router-dom";

import page_style from '../css/start_page_style.css';
import my_style from '../css/my_style.css';

function Start_Form() {

    const [info, setInfo] = useState('');
    const {LogIn, SignUp} = useStart()

    useEffect(() => {
        console.log('Start_Form::componentDidMount');

        return () => {
            console.log('Start_Form::componentWillUnmount');
        };
    },[]);
 
    return (
            <>
                <div className="E_head">
                    <div>Авторизация</div>
                </div>
                <div className="E_main"></div>
                <div className="E_info">
                    <div className="text-info">
                        {info}
                    </div>
                </div>
                <div className="E_button">
                    <div className="log-in-form-button my-button" onClick={LogIn}>Log in</div>
                    <div className="sign-up-form-button my-button" onClick={SignUp}>Sign up</div>
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
            result => console.log('navigate'),//navigate('/work'),
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
                <div className="E_head">
                        <div>Авторизация</div>
                </div>
                <div className="E_main">
                    <div className="log-in-form">
                        <div className="input-log-in">
                            <p>Логин</p>
                            <input type="text" size="25" className="name-log-in" value={login} onChange={() => setLogin(target.value)}/>
                        </div>
                        <div className="input-pass">
                            <p>Пароль</p>
                            <input type="text" size="25" className="pass-log-in" value={password} onChange={() => setPassword(target.value)}/>
                        </div>
                    </div>  
                </div>
                <div className="E_info">
                    <div className="text-info">
                        {info}
                    </div>
                </div>
                <div className="E_button">
                    <div className="back-button my-button" onClick={Back}>Назад</div>
                    <div className="log-in-button my-button" disabled={disable} onClick={LoginClick}>Войти</div>
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
                <div className="E_head">
                    <div>Авторизация</div>
                </div>
                <div className="E_main">
                    <div className="sign-up-form">
                        <div className="input-email">
                            <p>Почта</p>
                            <input type="text" size="25" className="email-sign-up" value={mail} onChange={() => setMail(target.value)}/>
                        </div>
                        <div className="input-login">
                            <p>Логин</p>
                            <input type="text" size="25" className="login-sign-up" value={login} onChange={() => setLogin(target.value)}/>
                        </div>
                        <div className="input-pass1">
                            <p>Пароль</p>
                            <input type="text" size="25" className="pass1-sign-up" value={password1} onChange={() => setPassword1(target.value)}/>
                        </div>
                        <div className="input-pass2">
                            <p>Повторите пароль</p>
                            <input type="text" size="25" className="pass2-sign-up" value={password2} onChange={() => setPassword2(target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="E_info">
                    <div className="text-info">
                        {info}
                    </div>
                </div>
                <div className="E_button">
                    <div className="back-button my-button" onClick={Back}>Назад</div>
                    <div className="sign-up-button my-button" disabled={disable} onClick={RegistClick}>Зарегистрироваться</div>
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
        Start_module.Start();
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

    useEffect(() => {
        console.log('start_page::componentDidMount');

        return () => {
            console.log('start_page::componentWillUnmount');
        };

    },[]);

    return (
        <div className="wrapper">
            <div className="back">
                <div className="head border-gradient">
                    <div>СиММиР</div>
                </div>
                <div className="main">
                    <div className="entry border-gradient">
                        <StartProvider/>
                    </div>
                </div>
                <div className="footer border-gradient">
                    <div>Информация</div>
                </div>   
            </div>
        </div>
    );

};

export default Start_Page;
