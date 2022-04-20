"use strict";

let my_fetch_module = (() => {

    class my_fetch_class {
        constructor(options = {}) {
            this._baseURL = options.baseURL || "http://localhost:8080/MPEE/api/";
          }

        async my_fetch_async(external_address, options) {
            return await fetch(this._baseURL + external_address, options);
        };
    }


    let my_fetch = (external_address, options) => {
        return new my_fetch_class().my_fetch_async(external_address, options);
    }

    return{
        my_fetch_async: my_fetch
    };


})();

export {my_fetch_module};