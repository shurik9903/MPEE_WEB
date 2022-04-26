import React from 'react';

import {Work_CSS_module} from './module/work_css_module';

import '../css/my_style.css'
import '../css/work_style.css'


class My_Scroll extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Work_CSS_module.My_Scroll(this)
    };

    componentWillUnmount() {
        
    };

    render(){
        return (
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
        );
    }
}

class Work_Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {Bar_Width: '100%'};
        console.log('work_page::constructor')
    }

    Collapse = (event) => {
        if (this.state.Bar_Width){
            event.target.innerHTML = '\u2771';
            this.setState({Bar_Width:null});
        } else {
            event.target.innerHTML = '\u2770';
            this.setState({Bar_Width:`100%`})
        }
    };

    componentDidMount() {
        console.log('work_page::componentDidMount');
    };

    componentWillUnmount() {
        console.log('work_page::componentWillUnmount');
    };

    render() {
        console.log('work_page::render');

        return (
            <div class="wrapper">
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
                            <div class="user_info_wrapper">
                                <div class="user_id">ID: </div>
                                <div class="user_name">Name: </div>
                            </div>
                            <div class="user_image_wrapper">
                                <img class="user_image"/>
                            </div>
                        </div>
                    </div>
                    <div class="main">
                        <div class="menu_bar">
                            <div class = "bar" style = {{ maxWidth: this.state.Bar_Width }}>
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
                            <div class="collapse_button" onClick={this.Collapse}>{'\u2770'}</div>
                        </div>
                        <div class="game_window">
                            <div class="game">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export {Work_Page}