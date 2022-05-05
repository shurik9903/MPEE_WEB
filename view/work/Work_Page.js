import React, {useState, useEffect, useRef} from 'react';

import {Work_CSS_module} from './module/work_css_module';

import '../css/my_style.css'
import '../css/work_style.css'
import '../css/Game_Grid.css'

// function Drop({children, id}) {

//     const drop = (e) => {
//         e.preventDefault();
//         const data = e.dataTransfer.getData('transfer');
//         e.target.appendChild(document.getElementById(data));
//     };

//     const allowDrop = (e) => {
//         e.preventDefault();
//     };

//     return(
//         <div id={id} onDrop={drop} onDragOver={allowDrop}>
//             {children}
//         </div>
//     );
// };

// function Drag({children, id}) {

//     const drag = (e) => {
//         e.dataTransfer.setData('transfer', e.target.id);
//     };

//     const noAllowDrop = (e) => {
//         e.stopPropagation();
//     };

//     return(
//         <div id={id} draggable="true" onDragStart={drag} onDragOver={noAllowDrop}>
//             {children}
//         </div>
//     );

// };

function Market_Cells({id}) {

    const drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
    };

    const noAllowDrop = (e) => {
        e.stopPropagation();
    };


    return(
        <div className="market_cells" id={id} draggable="true" onDragStart={drag} onDragOver={noAllowDrop}>
            {'Text'}
        </div>
    );

};

function Game_Cells() {

    return(
        <div className="game_Cells" >
            {'Text'}
        </div>
    );

};

function Player_Grid() {

    const [Grid,setGrid] = useState({Rows: 5, Columns: 5, Cells: null});

    useEffect(() => {
        let All_Cells = [];

        for (let i = 1; i <= Grid.Columns; i++)
            for (let j = 1; j <= Grid.Rows; j++)
                All_Cells.push(<Game_Cells/>);    
        
        setGrid({Cells: All_Cells})
    },[]);

    return (
        <div className="player_Grid" >
            {Grid.Cells}
        </div>
    );
}

function Game_Grid() {

    return(
            <div className="game_Grid" >
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

function Game_Window({children}) {

    const scroll_comp = useRef(null);

    const setScrollRef = (element) => {
        scroll_comp.current = element
    };

    useEffect(() => {
        if (scroll_comp.current)    
            Work_CSS_module.My_Scroll(scroll_comp.current)
    },[]);

    return(
            <div className="game_window" ref={setScrollRef}>
                <div className="game">
                    <div className='game_back'/>
                    <div className='game_elements'>
                        {children}
                    </div>
                </div>
            </div>
    );

};


function My_Scroll({children, id}) {

    const scroll_comp = useRef(null);

    const setScrollRef = (element) => {
        scroll_comp.current = element
    };

    const drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        e.target.appendChild(document.getElementById(data));
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    return(
            <div className="my_scroll" ref={setScrollRef} id={id} onDrop={drop} onDragOver={allowDrop}>
                {children}
            </div>
    );

};

function Work_Page() {

    console.log('work_page::constructor')

    const [Bar_Width, setBar_Width] = useState('100%');

    const Collapse = (event) => {
        if (Bar_Width) {
            event.target.innerHTML = '\u2771';
            setBar_Width(null);
        } else {
            event.target.innerHTML = '\u2770';
            setBar_Width(`100%`);
        }
    };

    useEffect(() => {
        console.log('work_page::componentDidMount');

        return(() => {
            console.log('work_page::componentWillUnmount');
        });
    }, []);

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
                        <div className = "bar" style = {{ maxWidth: Bar_Width }}>
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
                                <div className="view_menu market">
                                    <My_Scroll id='DR1'>
                                    
                                        <Market_Cells id='1'/>
                                        <Market_Cells id='2'/>
                                        <Market_Cells id='3'/>
                                        <Market_Cells id='4'/>
                                        <Market_Cells id='5'/>
                                        <Market_Cells id='6'/>
                                        <Market_Cells id='7'/>
                                        <Market_Cells id='8'/>
                                        <Market_Cells id='9'/>
                                        <Market_Cells id='10'/>
                                        <Market_Cells id='11'/>
                                        <Market_Cells id='12'/>
                                        <Market_Cells id='13'/>
                                        <Market_Cells id='14'/>
                                        <Market_Cells id='15'/>
                                        <Market_Cells id='16'/>
                                    
                                    </My_Scroll>
                                </div>
                            </div>
                            <div className="right-bar">
                                <div className="view_menu bag">
                                    <My_Scroll id='DR2'>
                                        <Market_Cells id='17'/>
                                    </My_Scroll>
                                </div>
                            </div>
                        </div>
                        <div className="collapse_button" onClick={Collapse}>{'\u2770'}</div>
                    </div>
                    <Game_Window>
                        <Game_Grid/>
                    </Game_Window>
                </div>
            </div>
        </div>
    );
};



export default Work_Page
