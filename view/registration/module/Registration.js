"use strict";

const my_fetch = require('../../module/my_fetch.js').my_fetch_async;

let Registration_module = (()=>{

    class Registration_class {

        async Registration_async(RegData) {

            let response = await my_fetch('registration/', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(RegData)});
            //let response = await fetch('/MPEE/api/registration', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(RegData)});
            
            if (response.ok) {
                let data = await response.json();
                let Msg = "";

                if (data.Msg)
                    Msg = data.Msg;

                return Msg;
            } else throw Error("response.serverError" + response.errors);
        };
    };

    let Registration = RegData => {
        return new Registration_class().Registration_async(RegData);
    }

    return{
        Registration_async: Registration
    };

})();

module.exports = Registration_module;