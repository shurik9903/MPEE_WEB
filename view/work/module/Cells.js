class Cells {

    #image
    #type
    #behavior
    #info
    

    constructor(data){

        this.#type = data.type;
        this.#behavior = data.behavior;
        this.#info = data.info;

        this.#setImage(type);
        // this.#image
    }

    #setImage(type) {
        this.#image = `../../image/grid/${type}.png`;
    }
}

export default Cells;