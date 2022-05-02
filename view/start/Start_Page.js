import React from 'react';

import {Start_module} from './module/start_page_module';
import {Login_module} from '../login/module/Login';
import {Registration_module} from '../registration/module/Registration';
import { useNavigate } from "react-router-dom";

import '../css/start_page_style.css';
import '../css/my_style.css';


class Start_Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {info:''};
    };

    SetInfo = (text) => {
        this.setState({info:text});
    };

    LogInClick = () => {
        this.props.data.logIn();
    };

    SignUpClick = () => {
        this.props.data.SignUp();
    };


    componentDidMount() {
        console.log('Start_Form::componentDidMount');
    };

    componentWillUnmount() {
        console.log('Start_Form::componentWillUnmount');
    };


    render(){
        return [
                <div className="E_head">
                    <div>Авторизация</div>
                </div>,
                <div className="E_main"></div>,
                <div className="E_info">
                    <div className="text-info">
                        {this.state.info}
                    </div>
                </div>,
                <div className="E_button">
                    <div className="log-in-form-button my-button" onClick={this.LogInClick}>Log in</div>
                    <div className="sign-up-form-button my-button" onClick={this.SignUpClick}>Sign up</div>
                </div>
        ];
    };
};

class Login_Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {login: '', password: '', info:''};
    };

    SetInfo = (text) => {
        this.setState({info:`${text}`});
    };

    LoginClick = () => {

        this.setState({
            disabled: true,
        });

        let LoginData = {
            login: this.state.login,
            password: this.state.password
        };
            
        let promise = Login_module.Login_async(LoginData);

        let text = this.SetInfo;

        

        promise.then(
            // result => this.props.navigate('/work'),
            error => text(error)
            ).finally(()=>
                this.setState({
                disabled: false,
                })
            );


            // promise.then(
            //     result => {text(result)},
            //     error => {text(error); console.log("Errorororororo");}
            // ).finally(()=> 
            //     this.setState({
            //         disabled: false,
            //     })
            // );
    };

    BackClick = () => {
        this.props.data.Back();
    };

    loginChange = (event) => {
        this.setState({login: event.target.value});
    };

    passwordChange = (event) => {
        this.setState({password: event.target.value});
    };

    componentDidMount() {
        console.log('Login_Form::componentDidMount');
    };

    componentWillUnmount() {
        console.log('Login_Form::componentWillUnmount');
    };

    render(){
        return [
            <div className="E_head">
                    <div>Авторизация</div>
                </div>,
                <div className="E_main">
                    <div className="log-in-form">
                        <div className="input-log-in">
                            <p>Логин</p>
                            <input type="text" size="25" className="name-log-in" value={this.state.login} onChange={this.loginChange}/>
                        </div>
                        <div className="input-pass">
                            <p>Пароль</p>
                            <input type="text" size="25" className="pass-log-in" value={this.state.password} onChange={this.passwordChange}/>
                        </div>
                    </div>  
                </div>,
                <div className="E_info">
                    <div className="text-info">
                        {this.state.info}
                    </div>
                </div>,
                <div className="E_button">
                    <div className="back-button my-button" onClick={this.BackClick}>Назад</div>
                    <div className="log-in-button my-button" disabled={this.state.disabled} onClick={this.LoginClick}>Войти</div>
                </div>
        ];
    };
};

class Regist_Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {mail:'', login:'', password1:'', password2:'', info:''};
    };

    SetInfo = (text) => {
        this.setState({info:`${text}`});
    };

    BackClick = () => {
        this.props.data.Back();
    };

    RegistClick = () => {

        this.setState({
            disabled: true,
        });
        
        let RegData = {
            email: this.state.mail,
            username: this.state.login,
            password: this.state.password1,
            password2: this.state.password2
        };

        let promise = Registration_module.Registration_async(RegData);

        let text = this.SetInfo;//(text)=>{console.log(text)}

        promise.then(
            result => text(result),
            error => text(error)
        ).finally(()=> 
            this.setState({
                disabled: false,
            })
        );
    };

    mailChange = (event) => {
        this.setState({mail: event.target.value});
    };

    loginChange = (event) => {
        this.setState({login: event.target.value});
    };

    password1Change = (event) => {
        this.setState({password1: event.target.value});
    };

    password2Change = (event) => {
        this.setState({password2: event.target.value});
    };

    componentDidMount() {
        console.log('Reg_Form::componentDidMount');
    };

    componentWillUnmount() {
        console.log('Reg_Form::componentWillUnmount');
    };

    render(){
        return [
            <div className="E_head">
                    <div>Авторизация</div>
                </div>,
                <div className="E_main">
                    <div className="sign-up-form">
                        <div className="input-email">
                            <p>Почта</p>
                            <input type="text" size="25" className="email-sign-up" value={this.state.mail} onChange={this.mailChange}/>
                        </div>
                        <div className="input-login">
                            <p>Логин</p>
                            <input type="text" size="25" className="login-sign-up" value={this.state.login} onChange={this.loginChange}/>
                        </div>
                        <div className="input-pass1">
                            <p>Пароль</p>
                            <input type="text" size="25" className="pass1-sign-up" value={this.state.password1} onChange={this.password1Change}/>
                        </div>
                        <div className="input-pass2">
                            <p>Повторите пароль</p>
                            <input type="text" size="25" className="pass2-sign-up" value={this.state.password2} onChange={this.password2Change}/>
                        </div>
                    </div>
                </div>,
                <div className="E_info">
                    <div className="text-info">
                        {this.state.info}
                    </div>
                </div>,
                <div className="E_button">
                    <div className="back-button my-button" onClick={this.BackClick}>Назад</div>
                    <div className="sign-up-button my-button" disabled={this.state.disabled} onClick={this.RegistClick}>Зарегистрироваться</div>
                </div>
        ];
    };
};

class Start_Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {form:''};
        
        console.log('start_page::constructor');
    };

    start_form_show = () => {
        this.setState({form:<Start_Form data={{logIn: this.login_form_show, SignUp: this.regist_form_show}}/>});
    };

    login_form_show = () => {
        this.setState({form:<Login_Form data={{Back: this.start_form_show}}/>});
    };

    regist_form_show = () => {
        this.setState({form:<Regist_Form data={{Back: this.start_form_show}}/>});
    };

    componentDidMount() {
        console.log('start_page::componentDidMount');
        this.start_form_show();
        Start_module.Start();
    };

    componentWillUnmount() {
        console.log('start_page::componentWillUnmount');
    };

    render() {
        console.log('start_page::render');

        return (

            <div className="wrapper">
                <div className="back">
                    <div className="head border-gradient">
                        <div>СиММиР</div>
                    </div>
                    <div className="main">
                        <div className="entry border-gradient">
                            {this.state.form}
                        </div>
                    </div>
                    <div className="footer border-gradient">
                        <div>Информация</div>
                    </div>   
                </div>
            </div>
        );
    }
};

export {Start_Page};
