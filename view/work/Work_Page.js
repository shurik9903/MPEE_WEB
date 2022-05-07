import React, {useState, useEffect, useRef} from 'react';

import {Work_CSS_module} from './module/work_css_module';
import {UserData_module} from '../module/UserData';

// import my_style from '../css/my_style.css';
import work_style from '../css/work_style.css'; 
import game_grid_style from '../css/Game_Grid.css'; 

import coin from '../image/resources/moneti.png';
import wood from '../image/resources/brevna.png';
import iron from '../image/resources/iron.png';
import cristall from '../image/resources/cristall.png';

import user_image from '../image/prow_image.png'
import star_image from '../image/791455802.jpg';

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
        <div className={game_grid_style.market_cells} id={id} draggable="true" onDragStart={drag} onDragOver={noAllowDrop}>
            {'Text'}
        </div>
    );

};

function Game_Cells() {

    return(
        <div className={game_grid_style.game_cells} >
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
        <div className={game_grid_style.player_grid} >
            {Grid.Cells}
        </div>
    );
}

function Game_Grid() {

    return(
            <div className={game_grid_style.game_grid} >
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
            <div className={work_style.game_window} ref={setScrollRef}>
                <div className={work_style.game}>
                    <div className={work_style.game_back} style={{backgroundImage:`url(${star_image})`}}/>
                    <div className={work_style.game_elements}>
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
            <div className={work_style.my_scroll} ref={setScrollRef} id={id} onDrop={drop} onDragOver={allowDrop}>
                {children}
            </div>
    );

};



const BarContext = React.createContext();

const useBar = () => {
    return useContext(BarContext);
}

const BarProvider = ({children}) => {
    const [page, setPage] = useState()

    useEffect(() => {
        setPage(<Start_Form/>);
    },[]);

    return (
        <BarContext.Provider value={{
            Back:() => setPage(<Start_Form/>),
            LogIn:() => setPage(<Login_Form/>),
            SignUp:() => setPage(<Regist_Form/>)
        }}>
            { page }
        </BarContext.Provider>
    );
};


function Work_Page() {

    console.log('work_page::constructor')

    const [Bar_Width, setBar_Width] = useState('100%');
    const [id, setid] = useState('');
    const [name, setName] = useState('');

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

        setName(UserData_module.getUserLogin());
        setid(UserData_module.getUserID());

        return(() => {
            console.log('work_page::componentWillUnmount');
        });
    }, []);

    return (
        <div className={work_style.wrapper}>
            <div className={work_style.back}>
                <div className={work_style.menu_wrapper}>
                    <div className={work_style.basic_menu_wrapper}>
                        <div className={work_style.scroll_wrapper}>
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
                        <div className={work_style.user_wrapper}>
                            <div className={work_style.user_info_wrapper}>
                                <div className={work_style.user_id}>ID: {id}</div>
                                <div className={work_style.user_name}>Name: {name}</div>
                            </div>
                            <div className={work_style.user_image_wrapper}>
                                <img className={work_style.user_image} src={user_image}/>
                            </div>
                        </div>
                    </div>
                    <div className={work_style.resources_wrapper}>
                        <div className={work_style.resources}>
                            <img src={coin} className={work_style.resources_image}/>
                        </div>
                        <div className={work_style.resources}>
                            <img src={wood} className={work_style.resources_image}/>
                        </div>
                        <div className={work_style.resources}>
                            <img src={iron} className={work_style.resources_image}/>
                        </div>
                        <div className={work_style.resources}>
                            <img src={cristall} className={work_style.resources_image}/>
                        </div>
                        <div className={work_style.resources}>
                        </div>
                        <div className={work_style.resources}>
                        </div>
                        <div className={work_style.resources}>
                        </div>
                    </div>
                </div>
                <div className={work_style.main}>
                    <div className={work_style.menu_bar}>
                        <div className ={work_style.bar} style = {{ maxWidth: Bar_Width }}>
                            <div className={work_style.left_bar}>
                                <div className={work_style.scroll_bar_menu}>
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
                                <div className={`${work_style.view_menu} ${game_grid_style.market}`}>
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
                            <div className={work_style.right_bar}>
                                <div className={`${work_style.view_menu} ${game_grid_style.bag}`}>
                                    <My_Scroll id='DR2'>
                                        <Market_Cells id='17'/>
                                    </My_Scroll>
                                </div>
                            </div>
                        </div>
                        <div className={work_style.collapse_button} onClick={Collapse}>{'\u2770'}</div>
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
