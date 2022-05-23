import coin_image from '../image/resources/moneti.png';
import wood_image from '../image/resources/brevna.png';
import iron_image from '../image/resources/iron.png';
import crystal_image from '../image/resources/cristall.png';

import user_image from '../image/prow_image.png'
import star_image from '../image/791455802.jpg';

import earth from '../image/grid/earth.jpg'
import grass from '../image/grid/grass.jpg'
import water from '../image/grid/water.jpg'


const Image_module = (() =>{

    console.log('image: '  + coin_image);

    return {
        earth: earth,
        grass: grass,
        water: water,
        user_image: user_image,
        star_image: star_image,
        crystal: crystal_image,
        iron: iron_image,
        wood: wood_image,
        coin: coin_image,
        default: null
    }
})();

export {Image_module};
