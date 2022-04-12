"use strict";
let FormStart_module = require('../start/start_page_form.js');
let Work_CSS_module = require('./module/work_css_module.js');

let FormWork_module = (() => {

    class FormWork_class {
        
        FormBodyWork = `<div class="wrapper">
        <div class="back">
            <div class="menu-wrapper">
                <div class="scroll_wrapper">
                    <ul class="my_scroll">
                        <li>
                            <p>меню-текст-1</p>
                        </li>
                        <li>
                            <p>меню-текст-2</p>
                        </li>
                        <li>
                            <p>меню-текст-3</p>
                        </li>
                        <li>
                            <p>меню-текст-4</p>
                        </li>
                        <li>
                            <p>меню-текст-5</p>
                        </li>
                        <li>
                            <p>меню-текст-6</p>
                        </li>
                        <li>
                            <p>меню-текст-7</p>
                        </li>
                        <li>
                            <p>меню-текст-8</p>
                        </li>
                    </ul>
                </div>
                <div class="user_wrapper">
                    <div class="user_info_wrapper"></div>
                    <div class="user_image_wrapper">
                        <img class="user_image">
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="menu_bar">
                    <div class="bar">
                        <div class="left-bar">
                            <div class="scroll_bar_menu">
                                <ul class="my_scroll">
                                    <li>
                                        <p>левая-панель-текст-1</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-2</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="view_menu">
                                <ul class="my_scroll">
                                    <li>
                                        <p>левая-панель-текст-1</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-2</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="right-bar">
                            <div class="view_menu">
                                <ul class="my_scroll">
                                    <li>
                                        <p>левая-панель-текст-1</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-2</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                    <li>
                                        <p>левая-панель-текст-3</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="collapse_button">&#10095</div>
                </div>
                <div class="game_window">
                    <div class="game">
                    </div>
                </div>
            </div>
        </div>
    </div>`;


    FormHeadWork = 
    `<script src="https://snipp.ru/cdn/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./site/css/work_style.css">`;
        
        ShowWork() {

            document.head.innerHTML = this.FormHeadWork;
            document.body.innerHTML = this.FormBodyWork;
            
            const collapse_button = document.querySelector('.collapse_button');
            const bar = document.querySelector('.bar')

            collapse_button.onclick = () => {
                if (bar.style.maxWidth){
                    collapse_button.innerHTML = `&#10095`;
                    bar.style.maxWidth = null;
                } else {
                    collapse_button.innerHTML = `&#10094`;
                    bar.style.maxWidth = `100%`;
                }
            };

            const slider = document.querySelectorAll('.my_scroll');
            const game_window = document.querySelector('.game_window');
            
            slider.forEach(e => Work_CSS_module.My_Scroll(e));
        
            Work_CSS_module.My_Scroll(game_window);

            //let UserID = document.getElementById("UserID");
            //let UserName = document.getElementById("UserName");
            //let UserToken = document.getElementById("UserToken");

            //UserID.innerText = ThisUser.UserID;
            //UserName.innerText = ThisUser.UserName;
            //UserToken.innerText = ThisUser.UserToken;


            //let text = document.getElementById("Result");
        };
    };




    let ShowWork = function () {
        new FormWork_class().ShowWork();
    };

    return {
        ShowWork: ShowWork
    };
})();


module.exports = FormWork_module;