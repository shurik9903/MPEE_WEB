"use strict";

let my_rand = require('../../module/my_function.js').my_rand;
let my_random_Color_Gradient = require('../../module/my_function.js').my_random_Color_Gradient;

let Start_module = (() =>  {

    class Start_class {

        star_box_constructor(){
            let pos = `${my_rand(5000)}px ${my_rand(5000)}px`;

            let color1 = {red: 214, green: 233, blue: 255};
            let color2 = {red: 0, green: 69, blue: 148};
            let color = my_random_Color_Gradient(my_rand(100)/100, color1, color2);

            let glow = NaN;
            let spread = NaN;
            let blur = NaN;

            let star = `${pos} ${color}`;

            for (let i = 1; i <= 3; i++){
                color = my_random_Color_Gradient(my_rand(100)/100, color1, color2);
                // glow = my_rand(4,0);
                // spread = `${glow}px`;
                // blur = `${glow + my_rand(3,1)}px`;
                star = `${star}, ${pos} ${i+1} ${i} ${color}`;
            };

            return star;
            //let star = `${my_rand(5000)}px ${my_rand(5000)}px ${my_rand(10)}px ${my_rand(10)}px ${color}`;
        };

        star_box_array(number) {
            let All_Star = `${my_rand(5000)}px ${my_rand(5000)}px ${my_rand(10)}px ${my_rand(10)}px #FFF`
            let color1 = {red: 214, green: 233, blue: 255};
            let color2 = {red: 0, green: 69, blue: 148};
            let color = NaN;
            for (let i = 1; i <= number; i++){
                color = my_random_Color_Gradient(my_rand(100)/100, color1, color2);
                console.log(color);
                All_Star = `${All_Star}, ${my_rand(5000)}px ${my_rand(5000)}px ${my_rand(10)}px ${my_rand(10)}px ${color}`;
            };
            return All_Star;
        };

        css_star() {

            let form = document.querySelector('.main')

            let top = form.offsetHeight

            var my_style_star = document.createElement('style');

            let Star_Small = this.star_box_array(5000);
            let Star_Medium = this.star_box_array(2500);
            let Star_Large = this.star_box_array(1000);

            my_style_star.innerHTML = 
            `.Star1, .Star2, .Star3 { 
                background: transparent;
                position: absolute;
                border-radius: 50%;
                left: 0;
                top: 0;
                
            }

            .Star1 { 
                width: 1px; 
                height: 1px; 
                box-shadow: ${Star_Small}
            }
            
            .Star2 { 
                width: 2px; 
                height: 2px; 
                box-shadow: ${Star_Medium}
            }

            .Star3 { 
                width: 3px; 
                height: 3px; 
                box-shadow: ${Star_Large}
            }`;
            

            let Star1 = document.createElement("div");
            let Star2 = document.createElement("div");
            let Star3 = document.createElement("div");

            Star1.classList.add('Star1')
            Star2.classList.add('Star2')
            Star3.classList.add('Star3')

            Star1.animate(
                [
                    { transform: 'translateY(0px)'},
                    { transform: `translateY(-${top}px)`}
                ],
                {
                    duration: 1000*50,
                    iterations: Infinity 
                }
            );

            Star2.animate(
                [
                    { transform: 'translateY(0px)'},
                    { transform: `translateY(-${top}px)`}
                ],
                {
                    duration: 1000*100,
                    iterations: Infinity 
                }
            );

            Star3.animate(
                [
                    { transform: 'translateY(0px)'},
                    { transform: `translateY(-${top}px)`}
                ],
                {
                    duration: 1000*150,
                    iterations: Infinity 
                }
            );

            let array_stars = [Star1, Star2, Star3];

            array_stars.forEach(e => {form.appendChild(e);})
            
            document.getElementsByTagName('head')[0].appendChild(my_style_star);
        }
    };


    let Start = () => {
        return new Start_class().css_star();
    }

    return{
        Start: Start
    };
})();

module.exports = Start_module;
