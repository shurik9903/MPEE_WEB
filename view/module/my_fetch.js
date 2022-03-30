let my_fetch_module = (() => {

    class my_fetch_class {
        constructor(options = {}) {
            this._baseURL = options.baseURL || "http://localhost:8080/MPEE/api/";
          }

        async my_fetch_async(external_address, options) {
            let response = await fetch(this._baseURL + external_address, options);

            return response;
        };
    }


    let my_fetch = (external_address, options) => {
        return new my_fetch_class().my_fetch_async(external_address, options);
    }

    return{
        my_fetch_async: my_fetch
    };


})();

module.exports = my_fetch_module;