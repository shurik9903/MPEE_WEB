"use strict";

// function ThisUser(){

//     let UserID = -1;
//     let UserLogin = -1;
//     let UserToken = -1;

//     return{
// 	getUserID: function(){ return UserID},
// 	setUserID: function(UserID){UserID = UserID},
// 	getUserLogin: function(){ return UserLogin},
// 	setUserLogin: function(UserLogin){UserLogin = UserLogin},
// 	getUserToken: function(){ return UserToken},
//     setUserToken: function(UserToken){UserToken = UserToken}
//     }	

// };

class UserData_class {

    constructor(){
        this.UserID = -1;
        this.UserLogin = -1;
        this.UserToken = -1;
    };

    getUserID = () => { return this.UserID};
    setUserID = (UserID) => {this.UserID = UserID}

    getUserLogin = () => { return this.UserLogin}
    setUserLogin = (UserLogin) => {this.UserLogin = UserLogin}

    getUserToken = () => { return this.UserToken}
    setUserToken = (UserToken) => {this.UserToken = UserToken}
};

let UserData = new UserData_class();


    
// let UserData;

//     class UserData_class {

//         constructor(){
//             this.UserID = -1;
//             this.UserLogin = -1;
//             this.UserToken = -1;
//         };
    
//         getUserID = () => { return this.UserID};
//         setUserID = (UserID) => {this.UserID = UserID}
    
//         getUserLogin = () => { return this.UserLogin}
//         setUserLogin = (UserLogin) => {this.UserLogin = UserLogin}
    
//         getUserToken = () => { return this.UserToken}
//         setUserToken = (UserToken) => {this.UserToken = UserToken}
//     };

//     if (UserData == null) {
//         UserData = new UserData_class();
//     }

const UserData_module = (() =>  {

    const getUserID = () => { return UserData.getUserID()};
    const setUserID = (UserID) => {UserData.setUserID(UserID)};

    const getUserLogin = () => { return UserData.getUserLogin()};
    const setUserLogin = (UserLogin) => {UserData.setUserLogin(UserLogin)};

    const getUserToken = () => { return UserData.getUserToken()};
    const setUserToken = (UserToken) => {UserData.setUserToken(UserToken)};

    const refreshData = () => {
        UserData = new UserData_class();
    }

    return{
        getUserID: getUserID,
        setUserID: setUserID,

        getUserLogin: getUserLogin,
        setUserLogin: setUserLogin,

        getUserToken: getUserToken,
        setUserToken: setUserToken,

        refreshData: refreshData
    }	

})();

export {UserData_module};