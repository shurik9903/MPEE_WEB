import React, {useState, useEffect, useRef, useContext} from 'react';

import {Work_CSS_module} from './module/work_css_module';
import {UserData_module} from '../module/UserData';
import {Market_module, Work_module} from './module/work_module';
import { Image_module } from '../module/Image_module';

import {Cells} from './module/Cells'

// import my_style from '../css/my_style.css';
import work_style from '../css/work_style.css'; 
import game_grid_style from '../css/Game_Grid.css'; 
import my_style from '../css/my_style.css';

// import coin from '../image/resources/moneti.png';
// import wood from '../image/resources/brevna.png';
// import iron from '../image/resources/iron.png';
// import crystal from '../image/resources/cristall.png';

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



function Market_Cells({id, InType, InCount, InPrice}) {

    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [type, setType] = useState('');

    const drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
    };

    const noAllowDrop = (e) => {
        e.stopPropagation();
    };

    useEffect(()=>{

        let AllPrice = [];

        setCount(InCount);
        setType(InType);

        if (InPrice) {
            Object.keys(InPrice).forEach(key => {
                AllPrice.push(
                    (
                        <div className={game_grid_style.block_price}>
                            <img draggable={false} src={Image_module[key]}/>
                            {InPrice[key]}
                        </div>
                    )
                );
            });
        }

        setPrice(AllPrice);

    },[])


    return(
        <div className={game_grid_style.market_cells} id={id} draggable="true" onDragStart={drag} onDragOver={noAllowDrop}>
            <div className={game_grid_style.count_field}>
                {count}
            </div>
            <img className={game_grid_style.cells_head_image} draggable={false} src={Image_module[type]}/>
            <div className={game_grid_style.price}>
                {price}
            </div>
        </div>
    );

};


function Bag_Cells({id, InType, InCount}) {


    const [count, setCount] = useState('');
    const [type, setType] = useState('');

    const drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
    };

    const noAllowDrop = (e) => {
        e.stopPropagation();
    };

    useEffect(()=>{

        setCount(InCount);
        setType(InType);
    },[])


    return(
        <div className={game_grid_style.market_cells} id={id} draggable="true" onDragStart={drag} onDragOver={noAllowDrop}>
            <div className={game_grid_style.count_field}>
                {count}
            </div>
            <img className={game_grid_style.cells_head_image} draggable={false} src={Image_module[type]}/>
        </div>
    );

};

function Game_Cells({cell_image = 'default'}) {

    return(
        <div className={game_grid_style.game_cells} >
            <img draggable={false} src={Image_module[cell_image]}/>
        </div>
    );

};

function Neighbor_Player_Grid() {

    const [Grid,setGrid] = useState({Size: 11, Cells: null});

    useEffect(() => {
        let All_Cells = [];

        for (let i = 1; i <= Grid.Size; i++)
            for (let j = 1; j <= Grid.Size; j++)
                All_Cells.push(<Game_Cells id={10 * (i + 1) + j + 1}/> );    
        
        setGrid( prev => { return { ...prev, Cells: All_Cells}})
    },[]);

    return (
        <div className={game_grid_style.player_grid } style={{gridTemplateColumns: `repeat(${Grid.Size}, 100px)`}}>
            {Grid.Cells}
        </div>
    );
}


function Player_Grid() {

    const [Grid,setGrid] = useState({Size: 11, Cells: null});

    const {getCell} = useWork();

    useEffect(() => {
        
        (async () => {

            let Cells;

            let All_Cells = [];

            let promise = await Work_module.GetWorkData_async();
            Cells = JSON.parse(promise.Cell);

            let Cell

            for (let i = 1; i <= Grid.Size; i++){
                for (let j = 1; j <= Grid.Size; j++){
                    Cell = Cells.find((data) => { return data.location.row == j && data.location.col == i})
                    All_Cells.push(<Game_Cells id={10 * (i + 1) + j + 1} cell_image={Cell ? Cell.type : 'default'}/> );    
                };
            };
            
            setGrid( prev => { return { ...prev, Cells: All_Cells}});
        })();

    },[]);

    return (
        <div className={game_grid_style.player_grid } style={{gridTemplateColumns: `repeat(${Grid.Size}, 100px)`}}>
            {Grid.Cells}
        </div>
    );
};


function Game_Grid() {

    return(
            <div className={game_grid_style.game_grid} >
                <Neighbor_Player_Grid id={11}/>
                <Neighbor_Player_Grid id={12}/>
                <Neighbor_Player_Grid id={13}/>
                <Neighbor_Player_Grid id={21}/>
                <Player_Grid id={'player'}/>
                <Neighbor_Player_Grid id={23}/>
                <Neighbor_Player_Grid id={31}/>
                <Neighbor_Player_Grid id={32}/>
                <Neighbor_Player_Grid id={33}/>
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


function My_Scroll({children, id, dropping = false}) {

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

    if (dropping)
        return(
            <div className={work_style.my_scroll} ref={setScrollRef} id={id} onDrop={drop} onDragOver={allowDrop}>
                {children}
            </div>
        );
    
    return(
        <div className={work_style.my_scroll}>
            {children}
        </div>
    );
        

};

function Bar_Menu() {

    const {Market, UserBag, Info} = useBar();

    return(
        <div className={work_style.scroll_bar_menu}>
            <My_Scroll> 
                <div onClick={Market}>
                    Магазин
                </div>
                <div onClick={UserBag}>
                    Инвентарь
                </div>
                <div onClick={Info}>
                    Инфо
                </div>
            </My_Scroll>
        </div>
    );

};

function User_Bag() {

    const [bag, setBag] = useState('');

    useEffect(()=>{

        console.log('User_Bag::componentDidMount');

        (async () => {

            let promise = await Work_module.GetWorkData_async();
            let Bag = JSON.parse(promise.Bag);

            let AllBag = []

            Bag.forEach(prod => 
                AllBag.push(<Bag_Cells id={prod.id} InType={prod.type} InCount={prod.number}/>)
            )

            setBag(AllBag);
        })();


    },[]);

    return(
        <div className={`${work_style.view_menu}`}>
            <My_Scroll >
                {bag}
            </My_Scroll>
        </div>
    );
};

function Shopping_Cart() {
    return(
        <div className={`${work_style.view_menu} ${game_grid_style.bag}`}>
            <My_Scroll id='DR2' dropping={true}>
                
            </My_Scroll>
        </div>
    );

}

function Market() {

    const {Shopping_Cart} = useBar();

    const [MarketCells, setMarketCells] = useState('');

    useEffect(()=>{

        console.log('Market::componentDidMount');

        (async () => {

            let promise = await Market_module.GetMarketData_async();
            let Products = JSON.parse(promise.Products)

            let AllProd = [];

            Products.forEach(prod => 
                AllProd.push(<Market_Cells id={prod.id} InType={prod.block} InCount={prod.count} InPrice={prod.price}/>)
            )

            setMarketCells(AllProd);

        })();



        Shopping_Cart(true);

        return() => {
            Shopping_Cart(false);
        };
    }, [])

    return(
        <div className={`${work_style.view_menu} ${game_grid_style.market}`}>
            <My_Scroll id='DR1' dropping={true} >
                {MarketCells}
            </My_Scroll>
        </div>
    );

}


const BarContext = React.createContext();

const useBar = () => {
    return useContext(BarContext);
}

const BarProvider = () => {
    const [left_page, setLeft_page] = useState()
    const [right_page, setRight_page] = useState()

    const right_bar = useRef(null)

    const setBarRef = (element) => {
        right_bar.current = element;
    };

    const [Bar_Width, setBar_Width] = useState('100%');

    const Buy = () => {
        console.log('Buy');
    };

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
        setLeft_page(<Market/>);
    },[]);

    const Show_Shopping_Cart = (show) => {
        if (show) {
            setRight_page(<Shopping_Cart/>);
            right_bar.current.style.display = 'flex';
        } else {
            setRight_page('')
            right_bar.current.style.display = 'none';
        }
    };

    return (
        <BarContext.Provider value={{
            Info:() => setLeft_page(''),
            Market:() => setLeft_page(<Market/>),
            Shopping_Cart: Show_Shopping_Cart,
            UserBag:() => setLeft_page(<User_Bag/>)
        }}>
            <div className ={work_style.bar} style = {{ maxWidth: Bar_Width }}>
                <div className={work_style.left_bar}>
                    <Bar_Menu/>
                    {left_page}
                </div>
                <div className={work_style.right_bar} ref={setBarRef}>
                    {right_page}
                    <div className={work_style.my_button} onClick={Buy}>
                        Купить
                    </div>
                </div>
            </div>
            <div className={work_style.collapse_button} onClick={Collapse}>{'\u2770'}</div>
        </BarContext.Provider>
    );
};

function UserResourse() {

    const [coin, setCoin] = useState(0);
    const [wood, setWood] = useState(0);
    const [iron, setIron] = useState(0);
    const [crystal, setCrystal] = useState(0);

    useEffect(()=>{
        (async () => {
            let promise = await Work_module.GetWorkData_async();
            let resources = JSON.parse(promise.Resources);

            setCoin(resources.coin);
            setWood(resources.wood);
            setIron(resources.iron);
            setCrystal(resources.crystal);
        })();
    },[])

    return (
        <div className={work_style.resources_wrapper}>
            <div className={work_style.resources}>
                <img src={Image_module.coin} className={work_style.resources_image}/>
                {coin}
            </div>
            <div className={work_style.resources}>
                <img src={Image_module.wood} className={work_style.resources_image}/>
                {wood}
            </div>
            <div className={work_style.resources}>
                <img src={Image_module.iron} className={work_style.resources_image}/>
                {iron}
            </div>
            <div className={work_style.resources}>
                <img src={Image_module.crystal} className={work_style.resources_image}/>
                {crystal}
            </div>
            <div className={work_style.resources}>
            </div>
            <div className={work_style.resources}>
            </div>
            <div className={work_style.resources}>
            </div>
        </div>
    )
}

const WorkContext = React.createContext();

const useWork = () => {
    return useContext(WorkContext);
}

function Work_Page() {

    console.log('work_page::constructor')

    
    const [id, setid] = useState('');
    const [name, setName] = useState('');

    const [bag, setBag] = useState('');
    const [cell, setCell] = useState('');
    const [resources, setResources] = useState('');


    const server_data = () => {

        let promise = Work_module.GetWorkData_async();

                // let text = document.getElementById("Result");

        promise.then(result => {
            
            let Bag = JSON.parse(result.Bag);
            let Resources = JSON.parse(result.Resources);
            let Cell = JSON.parse(result.Cell);
            
            setBag(Bag);
            setCell(Cell);
            setResources(Resources);

        })
        .catch(error => {
            if (error.status != 403){
                console.log(error);
            }else{
                console.log(error);
            }
        });

    }
    

    useEffect(() => {
        console.log('work_page::componentDidMount');

        setName(UserData_module.getUserLogin());
        setid(UserData_module.getUserID());

        // let data = Work_module.GetWorkData_async();

        return(() => {
            console.log('work_page::componentWillUnmount');
        });
    }, []);

    return (
        <div className={work_style.wrapper}>
            <div className={work_style.back}>
                <WorkContext.Provider value={{
                    getCell: () => {return cell},
                    getBag: () => {return bag},
                    getResources: () => {return resources}
                }}>
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
                        <UserResourse/>
                    </div>
                    <div className={work_style.main}>
                        <div className={work_style.menu_bar}>
                            <BarProvider/>
                        </div>
                        <Game_Window>
                            <Game_Grid/>
                        </Game_Window>
                    </div>
                </WorkContext.Provider>
            </div>
        </div>
    );
};



export default Work_Page
