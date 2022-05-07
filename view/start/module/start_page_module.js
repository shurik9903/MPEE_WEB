"use strict";

import {my_function_module} from '../../module/my_function';

let my_rand = my_function_module.my_rand;
let my_random_Color_Gradient = my_function_module.my_random_Color_Gradient;

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

        css_star(form) {

            // let form = document.querySelector('.main')

            let top = form.offsetHeight
            
            var my_style_star = document.createElement('style');
            
            let Star_Small = this.star_box_array(3000, {red: 255, green: 255, blue: 255}, {red: 0, green: 150, blue: 255});
            let Star_Medium = this.star_box_array(1500, {red: 255, green: 255, blue: 255}, {red: 255, green: 145, blue: 0} );
            let Star_Large = this.star_box_array(1000, {red: 255, green: 255, blue: 255}, {red: 170, green: 170, blue: 170});

            my_style_star.innerHTML = 
            `.Star1, .Star2, .Star3 { 
                
                background: transparent;
                position: absolute;
                border-radius: 50%;
                left: 0;
                top: 0;
            }

            .Star1 { 
                -webkit-filter: blur(4px);
                width: 1px; 
                height: 1px; 
                box-shadow: ${Star_Small};
            }
            
            .Star2 {
                -webkit-filter: blur(2px); 
                width: 3px; 
                height: 3px; 
                box-shadow: ${Star_Medium};
            }

            .Star3 {
                -webkit-filter: blur(1px); 
                width: 8px; 
                height: 8px; 
                box-shadow: ${Star_Large};
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


    let Start = (form) => {
        return new Start_class().css_star(form);
    }

    return{
        Start: Start
    };
})();

export {Start_module};
