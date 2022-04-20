"use strict";
const my_fetch = require('../../module/my_fetch.js').my_fetch_async;

let Login_module = (() =>{
    class Login_class {
        async Login_async(LoginData) {

            let login = LoginData.login;
            let password = LoginData.password;
            
            let response = await my_fetch('login/' + login + '/' + password, { method: 'GET', headers: { 'Token': 'null' }})
            //let login_response = await fetch('/MPEE/api/login/' + login + '/' + password, { method: 'GET', headers: { 'Token': 'null' }});
            
            if (response.ok) {
                const data = await response.json();

                if (data.Msg)
                    throw Error(data.Msg);

                console.log(data);
                ThisUser.UserID = data.UserID;
                ThisUser.UserName = data.UserName;
                ThisUser.UserToken = data.Token;

                return 'ok';
            } else throw Error("response.serverError " + response.errors);


        };

    }

    let Login_token = LoginData => {
        return new Login_class().Token_async(LoginData);
    }

    let Login = LoginData => {
        return new Login_class().Login_async(LoginData);
    }

    return{
        Login_token_async: Login_token,
        Login_async: Login
    };
})();

export {Login_module};
