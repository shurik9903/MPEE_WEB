"use strict";

import {my_fetch_module} from '../../module/my_fetch';
const my_fetch = my_fetch_module.my_fetch_async;

let Login_module = (() =>{
    class Login_class {
        async Login_async(LoginData) {

            let login = LoginData.login;
            let password = LoginData.password;
            
            let response = await my_fetch('login/' + login + '/' + password, { method: 'GET', headers: { 'Token': 'null' }})
            .catch(error => {throw Error("Failed to fetch")});
            
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
