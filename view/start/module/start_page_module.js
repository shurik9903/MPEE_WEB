"use strict";

let my_rand = require('../../module/my_function.js').my_rand;
let my_random_Color_Gradient = require('../../module/my_function.js').my_random_Color_Gradient;

let Start_module = (() =>  {

    class Start_class {

        star_box_constructor(color1 = {red: 255, green: 255, blue: 255}, color2 = {red: 255, green: 255, blue: 255}){
            let pos = `${my_rand(5000)}px ${my_rand(5000)}px`;
            let color = my_random_Color_Gradient(my_rand(100)/100, color1, color2);

            let spread = my_rand(3, 1)

            let blur = spread + my_rand(2, 1)
            
            let star = `${pos} ${color}`;

            for (let i = 1; i <= 3; i++){
                color = my_random_Color_Gradient(my_rand(100)/100, color1, color2);
                star = `${star}, ${pos} ${i+spread}px ${i+blur}px ${color}`;
            };

            return star;
        };

        star_box_array(number, color1 = {red: 255, green: 255, blue: 255}, color2 = {red: 255, green: 255, blue: 255}) {
            let All_Star = []
            for (let i = 1; i <= number; i++){
                All_Star.push(this.star_box_constructor(color1, color2));
            };
            return All_Star.join();
        };

        css_star() {

            let form = document.querySelector('.main')

            let top = form.offsetHeight
            
            var my_style_star = document.createElement('style');
            
            let Star_Small = this.star_box_array(3000, {red: 90, green: 160, blue: 255}, {red: 60, green: 60, blue: 150});
            let Star_Medium = this.star_box_array(1500, {red: 116, green: 181, blue: 255}, {red: 255, green: 220, blue: 180});
            let Star_Large = this.star_box_array(1000, {red: 90, green: 90, blue: 150}, {red: 210, green: 210, blue: 255});

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
                width: 3px; 
                height: 3px; 
                box-shadow: ${Star_Medium}
            }

            .Star3 { 
                width: 8px; 
                height: 8px; 
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
