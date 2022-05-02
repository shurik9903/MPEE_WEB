import React from 'react';

import {Work_CSS_module} from './module/work_css_module';

import '../css/my_style.css'
import '../css/work_style.css'
import '../css/Game_Grid.css'

class Cells extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render(){
        return (
            <div className="Cells" >
                {'Text'}
            </div>
        );
    };

}

class Player_Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {Grid: {Rows: 5, Columns: 5, Cells: null}}
    }

    componentDidMount() {
    
        let All_Cells = [];

        for (let i = 1; i <= this.state.Grid.Columns; i++)
            for (let j = 1; j <= this.state.Grid.Rows; j++)
                All_Cells.push(<Cells/>);    
        
        this.setState({Grid:{Cells: All_Cells}})


    };

    componentWillUnmount() {};

    render(){
        return (
            <div className="Player_Grid" >
                {this.state.Grid.Cells}
            </div>
        );
    };
}

class Game_Grid extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {};

    componentWillUnmount() {};

    render(){
        return (
            <div className="Game_Grid" >
                <Player_Grid/>
                <Player_Grid/>
                <Player_Grid/>
                <Player_Grid/>
                <Player_Grid/>
                <Player_Grid/>
                <Player_Grid/>
                <Player_Grid/>
                <Player_Grid/>
            </div>
        );
    };

}

class Game_Window extends React.Component {

    constructor(props) {
        super(props);

        this.scroll_comp = null;

        this.setScrollRef = element => {
            this.scroll_comp = element;
        };
    }

    componentDidMount() {
        if (this.scroll_comp)    
            Work_CSS_module.My_Scroll(this.scroll_comp)
    };

    componentWillUnmount() {};

    render(){
        return (
            <div className="game_window" ref={this.setScrollRef}>
                
                <div className="game">
                    <div className='game_back'/>
                    <div className='game_elements'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };

}

class My_Scroll extends React.Component {
    
    constructor(props) {
        super(props);

        this.scroll_comp = null;

        this.setScrollRef = element => {
            this.scroll_comp = element;
        };
    }

    componentDidMount() {
        if (this.scroll_comp)    
            Work_CSS_module.My_Scroll(this.scroll_comp)
    };

    componentWillUnmount() {
        
    };

    render(){
        return (
            <ul className="my_scroll" ref={this.setScrollRef}>
                {this.props.children}
            </ul>
        );
    };
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
            <div className="wrapper">
                <div className="back">
                    <div className="menu-wrapper">
                        <div className="scroll_wrapper">
                            <My_Scroll>
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
                            </My_Scroll>
                        </div>
                        <div className="user_wrapper">
                            <div className="user_info_wrapper">
                                <div className="user_id">ID: </div>
                                <div className="user_name">Name: </div>
                            </div>
                            <div className="user_image_wrapper">
                                <img className="user_image"/>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <div className="menu_bar">
                            <div className = "bar" style = {{ maxWidth: this.state.Bar_Width }}>
                                <div className="left-bar">
                                    <div className="scroll_bar_menu">
                                        <My_Scroll> 
                                            <li>
                                                <p>левая-панель-текст-1</p>
                                            </li>
                                            <li>
                                                <p>левая-панель-текст-2</p>
                                            </li>
                                            <li>
                                                <p>левая-панель-текст-3</p>
                                            </li>
                                        </My_Scroll>
                                    </div>
                                    <div className="view_menu">
                                        <My_Scroll>
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
                                        </My_Scroll>
                                    </div>
                                </div>
                                <div className="right-bar">
                                    <div className="view_menu">
                                        <My_Scroll>
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
                                        </My_Scroll>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse_button" onClick={this.Collapse}>{'\u2770'}</div>
                        </div>
                        <Game_Window>
                            <Game_Grid/>
                        </Game_Window>
                    </div>
                </div>
            </div>
        );
    };

};

export {Work_Page};