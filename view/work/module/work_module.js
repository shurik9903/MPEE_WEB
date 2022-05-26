"use strict";

import {my_fetch_module} from '../../module/my_fetch';
const my_fetch = my_fetch_module.my_fetch_async;

import {UserData_module}  from '../../module/UserData';

// export const Work_module = (function(){

//     class TableData_class {

//         async GetTableData_async(){
//             console.log(ThisUser.UserToken);
//             let response = await fetch('/MPEE/api/table/' + ThisUser.UserID, { method: 'GET', headers: {'Token': ThisUser.UserToken}})
//             if(response.ok) {
//                 const data = await response.json();

//                 let Msg = "";

//                 if (data.Msg)
//                     throw Error(Msg);
//                 return data;
//             } else
//                 throw {
//                     status: response.status,
//                     Msg: response.message
//                 };
//         };
//     };

//     let TableData = function(){
//         return new TableData_class().GetTableData_async();
//     }

//     return{
//         GetTableData_async:TableData,
//     }

// })();

// export const SaveTableData_module =  (function(){

//     class SaveTableData_class{

//         async PostSaveData_async(TableData){
            
//             let response = await fetch('/MPEE/api/table', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8', 'Token': ThisUser.UserToken}, body: JSON.stringify(TableData) });
//             if (response.ok) {
//                 const data = await response.json();

//                 let Msg = "";
//                 if (data.Msg)
//                     Msg = data.Msg;

//                 return data;
//             } else
//                 throw {
//                     status: response.status,
//                     Msg: response.message
//                 };
//         };
//     };

//     let SaveTableData = function(TableData){
//         return new SaveTableData_class().PostSaveData_async(TableData);
//     }

//     return{
//         PostSaveData_async: SaveTableData
//     }
// })();



const Work_module = (function(){

    class Work_class {

        async GetWorkData_async(user_id){

            if (user_id == null)
                user_id = UserData_module.getUserID()

            let response = await my_fetch('work/' + user_id, { method: 'GET', headers: {'Token': UserData_module.getUserToken()}})
            .catch(error => {throw Error(error)});

            if(response.ok) {
                const data = await response.json();

                if (data.Msg)
                    throw Error(data.Msg);
                    
                return data;
            } else
                throw {
                    status: response.status,
                    Msg: response.message
                };
        };
    };

    let WorkData = (user_id = null) => {
        return new Work_class().GetWorkData_async(user_id);
    }

    return{
        GetWorkData_async:WorkData,
    }

})();

const Market_module = (function(){

    class Market_class {

        async GetMarketData_async(){

            let response = await my_fetch('market/' + UserData_module.getUserID(), { method: 'GET', headers: {'Token': UserData_module.getUserToken()}})
            .catch(error => {throw Error(error)});

            if(response.ok) {
                const data = await response.json();

                if (data.Msg)
                    throw Error(data.Msg);
                
                return data;
            } else
                throw {
                    status: response.status,
                    Msg: response.message
                };
        };
    };

    let MarketData = () => {
        return new Market_class().GetMarketData_async();
    }

    return{
        GetMarketData_async:MarketData,
    }

})();

export {Work_module, Market_module};



// export const SaveTableData_module =  (function(){

//     class SaveTableData_class{

//         async PostSaveData_async(TableData){
            
//             let response = await fetch('/MPEE/api/table', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8', 'Token': ThisUser.UserToken}, body: JSON.stringify(TableData) });
//             if (response.ok) {
//                 const data = await response.json();

//                 let Msg = "";
//                 if (data.Msg)
//                     Msg = data.Msg;

//                 return data;
//             } else
//                 throw {
//                     status: response.status,
//                     Msg: response.message
//                 };
//         };
//     };

//     let SaveTableData = function(TableData){
//         return new SaveTableData_class().PostSaveData_async(TableData);
//     }

//     return{
//         PostSaveData_async: SaveTableData
//     }
// })();