"use strict";
import {my_fetch_module} from '../../module/my_fetch';
const my_fetch = my_fetch_module.my_fetch_async;

let Registration_module = (()=>{

    class Registration_class {

        async Registration_async(RegData) {

            let response = await my_fetch('registration/', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(RegData)})
            .catch(error => {throw Error("Failed to fetch")});

            // if (response.ok) {
            //     let data = await response.json();
            //     let Msg = "";

            //     if (data.Msg)
            //         Msg = data.Msg;

            //     return Msg;
            // } else throw Error("response.serverError" + response.errors);
        };
    };

    let Registration = RegData => {
        return new Registration_class().Registration_async(RegData);
    }

    return{
        Registration_async: Registration
    };

})();

export {Registration_module};