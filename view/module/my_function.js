"use strict";

let my_function_module = (() => {

    class my_function {
        get_Random_Int_Inclusive(max, min = 0) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        random_Color_Gradient(fadeFraction, rgbColor1, rgbColor2) {
            var color1 = rgbColor1;
            var color2 = rgbColor2;
            var fade = fadeFraction;
        
            var diffRed = color2.red - color1.red;
            var diffGreen = color2.green - color1.green;
            var diffBlue = color2.blue - color1.blue;
        
            var gradient = {
              red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
              green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
              blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
            };
        
            return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
        }
    };



    let my_rand = (max, min = 0) => {
        return new my_function().get_Random_Int_Inclusive(max,min);
    };

    let my_random_Color_Gradient = (fadeFraction, rgbColor1, rgbColor2) => {
        return new my_function().random_Color_Gradient(fadeFraction, rgbColor1, rgbColor2);
    };

    return{
        my_rand: my_rand,
        my_random_Color_Gradient: my_random_Color_Gradient
    };
    
})();

module.exports = my_function_module;