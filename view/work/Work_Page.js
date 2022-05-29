import React, {useState, useEffect, useRef, useContext} from 'react';

import {Work_CSS_module} from './module/work_css_module';
import {UserData_module} from '../module/UserData';
import {Market_module, Work_module} from './module/work_module';
import {Image_module} from '../module/Image_module';

import work_style from '../css/work_style.css'; 
import game_grid_style from '../css/Game_Grid.css'; 

import user_image from '../image/prow_image.png'
import star_image from '../image/791455802.jpg';

import modal_style from '../css/Modal_style.css'
import slider_style from '../css/Slider_style.css'

function Slider_Range(props) {

    const {
        step, 
        min, 
        max, 
        value, 
        defaultLength, 
        OnChangeValue
    } = props;

    const rangeRef = useRef();
    const [range, setRange] = useState(defaultLength);

    useEffect(() => {
        const rangeValue = parseInt(rangeRef.current.value, 10);
        rangeLinearGradient(rangeValue, min, max);

    }, [rangeRef, min, max]);


    const calculatePercentage = (value, min, max) => {
        return ((value - min) / (max - min)) * 100;
    }

    const rangeLinearGradient = (value, min, max) => {
        const percentage = calculatePercentage(value, min, max);

        const newBackgroundStyle = `linear-gradient(90deg, var(--main-slider-min-color1) ${percentage* 0.1 + '%'}, var(--main-slider-min-color2) ${percentage + '%'}, var(--main-slider-max-color) ${percentage + '%'} 100%)`;
        
        rangeRef.current.style.background = newBackgroundStyle;
    }

    const HandleChange = max => e => {

        let value = e.target.value;
        OnChangeValue(value);
        setRange(value);
        rangeLinearGradient(value, min, max);
    }

    return(
        <>
            <div className={slider_style.slider}>
                <input className={slider_style.slider_range} 
                ref={rangeRef}
                type='range'
                step={step}
                min={min}
                max={max}
                value={value}
                onChange={HandleChange(max)}
                />
                <div className={slider_style.slider_value}>{value}</div>
                <div className={slider_style.slider_min_max}>
                    <div>{min}</div><div>{max}</div>
                </div>
            </div>
        </>
    )
}

Slider_Range.defaultProps = {
    step: 1,
    min: 0,
    max: 100,
    value: 50,
    defaultLength: 100, 
    OnChangeValue: (e) => {}
  }


function Market_Modal({count, callback}) {

    const {close} = useModal();

    const [slider_value, setSliderValue] = useState(0);

    const OnChangeValueSlider = value => {
        setSliderValue(parseInt(value, 10));
    }

    return (
        <>
            <div>Количество</div>
            <Slider_Range 
            min={0} 
            max={count} 
            step={1} 
            defaultLength={slider_value} 
            value={slider_value}
            OnChangeValue={OnChangeValueSlider}
            />
            <div className={work_style.market_modal_button}>
                <div className={work_style.ok} onClick={() => {callback(slider_value); close()}}>
                    Купить
                </div>
                <div className={work_style.cancel} onClick={() => {close()}}>
                    Отмена
                </div>
            </div>
        </>
    )
}

const ModalContext = React.createContext();

const useModal = () => {
    return useContext(ModalContext);
}

function ModalWindow({active, setActive, children}){

    const close = () => {
        setActive(false);
    }



    // useEffect(()=>{
    //     if (!active)
    //         children = null;
    // },[active])

    return(
        <div className={active ? `${modal_style.modal} ${modal_style.active}` : modal_style.modal} onClick={close}>
            <div className={active ? `${modal_style.modal_body} ${modal_style.active}` : modal_style.modal_body} onClick={e => e.stopPropagation()}>
                <div className={modal_style.close} onClick={close}>X</div>
                <ModalContext.Provider value={{
                    close: close
                }}>
                    {children}
                </ModalContext.Provider>
            </div>
        </div>
    );

};

function Market_Cells({id, InType, InCount, InPrice}) {

    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [type, setType] = useState('');

    const drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
        // e.dataTransfer.setData('count', count);
        // e.dataTransfer.setData('this', e.target);
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
        <div className={game_grid_style.market_cells} id={id} draggable={true} onDragStart={drag} onDragOver={noAllowDrop}>
            <div id={'count'} className={game_grid_style.count_field}>
                {count}
            </div>
            <img id={'img'} className={game_grid_style.cells_head_image} draggable={false} src={Image_module[type]}/>
            <div id={'price'} className={game_grid_style.price}>
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

function Game_Cells({cell_image = 'default', dropping = false}) {

    return(
        <div className={game_grid_style.game_cells} >
            <img draggable={false} src={Image_module[cell_image]}/>
        </div>
    );

};

function Neighbor_Player_Grid({id}) {

    const {AllNeigh} = useGameGrid();

    const [size, setSize] = useState(11);
    const [grid, setGrid] = useState(null);


    useEffect(() => {

        (async () => {

            let Cells = [];
            let Cell = null;
            let All_Cells = [];
            let user_id = AllNeigh[id];

            if (user_id >= 0){
                let promise = await Work_module.GetWorkData_async(user_id);
                Cells = JSON.parse(promise.Cell);
            }

            for (let i = 1; i <= size; i++){
                for (let j = 1; j <= size; j++){
                    Cell = Cells.find((data) => { return data.location.row == j && data.location.col == i})
                    All_Cells.push(<Game_Cells id={10 * (i + 1) + j + 1} cell_image={Cell != null ? Cell.type : 'default'}/> );    
                };
            };
            
            setGrid(All_Cells);
        })();

    },[AllNeigh]);

    return (
        <div className={game_grid_style.player_grid } style={{gridTemplateColumns: `repeat(${size}, 100px)`}}>
            {grid}
        </div>
    );
}


function Player_Grid({id}) {

    const {data} = useGameGrid();

    const [size, setSize] = useState(11);
    const [grid, setGrid] = useState(null);

    useEffect(() => {

        (async () => {

            let Cells = [];
            let Cell = null;
            let All_Cells = [];

            if (data)
                Cells = JSON.parse(data.Cell);

            for (let i = 1; i <= size; i++){
                for (let j = 1; j <= size; j++){
                    Cell = Cells.find((data) => { return data.location.row == j && data.location.col == i})
                    All_Cells.push(<Game_Cells id={10 * (i + 1) + j + 1} cell_image={Cell != null ? Cell.type : 'default'}/> );    
                };
            };
            
            setGrid(All_Cells);
        })();

    },[data]);

    return (
        <div className={game_grid_style.player_grid } style={{gridTemplateColumns: `repeat(${size}, 100px)`}}>
            {grid}
        </div>
    );
};


const GameGridContext = React.createContext();

const useGameGrid = () => {
    return useContext(GameGridContext);
}

function Game_Grid() {
    const [neighbours,setNeighbours] = useState({});
    const [playerData, setPlayerData] = useState(null);

    const {getUserData} = useWork();

    useEffect(() => {
        if (getUserData){
            setPlayerData(getUserData);
            setNeighbours(JSON.parse(getUserData.Neighbours));
        }
    },[getUserData]);

    return(
            <div className={game_grid_style.game_grid} >
                <GameGridContext.Provider value={{AllNeigh: neighbours, data: playerData}}>
                    <Neighbor_Player_Grid id={'TL'}/>
                    <Neighbor_Player_Grid id={'T'}/>
                    <Neighbor_Player_Grid id={'TR'}/>
                    <Neighbor_Player_Grid id={'L'}/>
                    <Player_Grid id={'player'}/>
                    <Neighbor_Player_Grid id={'R'}/>
                    <Neighbor_Player_Grid id={'DL'}/>
                    <Neighbor_Player_Grid id={'D'}/>
                    <Neighbor_Player_Grid id={'DR'}/>
                </GameGridContext.Provider>
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


function Market_Scroll({children, id}){
    const [cells, setCells] = useState([]);

    const {setMarketChild, getMarketProduct, getShopChild} = useWork();

    useEffect(()=>{
        setCells(children);
    },[children])

    useEffect(()=>{
        setMarketChild(cells);
    }, [cells])

    return(
        <div className={work_style.my_scroll} id={id}>
            {cells}
        </div>
    )
}

function Shopping_Scroll({id}) {

    const {setModalVisible, setModalChild, getMarketChild} = useWork();

    const [cells, setCells] = useState([]);


    const drop = (e) => {
        e.preventDefault();

        const e_id = e.dataTransfer.getData('transfer');
        const cell = getMarketChild.find(element => {
            return element.props.id == e_id;
        }).props;

        
        const buy = slider_count => {
            console.log('test111 ', cells);
            
            const in_cell = cells.findIndex(element => {
                return element.props.id == cell.id;
            });

            
            let new_cell;

            if (in_cell < 0){
                console.log("1", in_cell)


                if (cell.InCount - slider_count <= 0) {
                    new_cell = <Market_Cells
                        id={cell.id} 
                        key={cell.id}
                        InType={cell.InType} 
                        InCount={cell.InCount} 
                        InPrice={cell.InPrice}/>;
                }else{
                    new_cell = <Market_Cells 
                        id={cell.id} 
                        key={cell.id}
                        InType={cell.InType} 
                        InCount={slider_count} 
                        InPrice={cell.InPrice}/>;
                }    

                setCells(prev => [...prev, new_cell]);

            }else{
                console.log("2");

                const cells_copy = cells.map( element => {
                    if (element.props.id ==  cell.id){
                        return <Market_Cells 
                        id={element.props.id}
                        key={element.props.id}
                        InType={element.props.InType} 
                        InCount={element.props.InCount + slider_count} 
                        InPrice={element.props.InPrice}/> 
                    };
                    return element;
                });
                
                console.log('test222', cells_copy);

                setCells(cells_copy);


                // new_cell = cells.find(element => {
                //     return element.id == cell.id;
                // }).value.props;


                // new_cell ={id: in_cell + 1, value: <Market_Cells 
                // id={new_cell.id} 
                // InType={new_cell.InType} 
                // InCount={new_cell.InCount + slider_count} 
                // InPrice={new_cell.InPrice}/>};

                // setCells([...cells].map(element => {

                //     console.log('ele  ',element);

                //     if (element.id == in_cell + 1)
                //         return new_cell;
                    
                //     return element;
                // }));

                // console.log('1   ', ...cells.slice(0, in_cell));
                // console.log('2   ', new_cell);
                // console.log('3   ', ...cells.slice(in_cell + 1));

                // setCells(update([...cells.slice(0, in_cell), new_cell, ...cells.slice(in_cell + 1)]));

                // // const ar = [...cells];
                // // ar.push(
                // //     ar.map( element => {
                // //             if (element.props.id ==  cell.id){
                // //                 return <Market_Cells 
                // //                 id={element.props.id}
                // //                 InType={element.props.InType} 
                // //                 InCount={element.props.InCount + slider_count} 
                // //                 InPrice={element.props.InPrice}/> 
                // //             };
                // //             return element;
                // //         })
                // // )
                // const cells_copy = []
                // cells_copy.push(...cells_copy, ...ar.map( element => {
                //     if (element.props.id ==  cell.id){
                //         return <Market_Cells 
                //         id={element.props.id}
                //         InType={element.props.InType} 
                //         InCount={element.props.InCount + slider_count} 
                //         InPrice={element.props.InPrice}/> 
                //     };
                //     return element;
                // }));


                // const cells_copy = cells.map( element => {
                //     if (element.props.id ==  cell.id){
                //         return <Market_Cells 
                //         id={element.props.id}
                //         InType={element.props.InType} 
                //         InCount={element.props.InCount + slider_count} 
                //         InPrice={element.props.InPrice}/> 
                //     };
                //     return element;
                // });
                
                // console.log('test222', cells_copy);

                // setCells(cells_copy);

                // setCells(prev => {
                //     prev = null;
                //     // prev.push(...cells_copy);
                //     // console.log('prev ', prev);
                //     return null;
                // });
                
                // setCells(prev => {
                //     prev = [...cells_copy];
                //     return prev;
                //     prev.push(...cells_copy);
                //     console.log('prev ', prev);
                //     return prev;
                // });
                // setCells(prev => {
                //     prev = null;
                //     // prev.push(...cells_copy);
                //     // console.log('prev ', prev);
                //     return [];
                // });
            }
        };


        // const removeItem = (id) => {
        //     setItems(items.filter(item => item.id !== id));
        //   }

        setModalChild(<Market_Modal count={cell.InCount} callback={buy}/>);
        setModalVisible(true);
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    return(
        <div className={work_style.my_scroll} id={id} onDrop={drop} onDragOver={allowDrop}>
            {cells}
        </div>
    )
};

function My_Scroll({children}) {
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
    const {getUserData} = useWork();

    useEffect(()=>{

        console.log('User_Bag::componentDidMount');

        let Bag = JSON.parse(getUserData.Bag);

        let AllBag = []

        Bag.forEach(prod => 
            AllBag.push(<Bag_Cells id={prod.id} InType={prod.type} InCount={prod.number}/>)
        )

        setBag(AllBag);



    },[getUserData]);

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
            <Shopping_Scroll id='Shop_Cart'>
            </Shopping_Scroll>
        </div>
    );
}

function Market() {

    const {Shopping_Cart_Visible} = useBar();

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

        Shopping_Cart_Visible(true);

        return() => {
            Shopping_Cart_Visible(false);
        };
    }, [])

    return(
        <div className={`${work_style.view_menu} ${game_grid_style.market}`}>
            <Market_Scroll id='Market'>
                {MarketCells}
            </Market_Scroll>
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
            Shopping_Cart_Visible: Show_Shopping_Cart,
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

    const {getUserData} = useWork();

    useEffect(()=>{

        if (getUserData){
            let resources = JSON.parse(getUserData.Resources);
            setCoin(resources.coin);
            setWood(resources.wood);
            setIron(resources.iron);
            setCrystal(resources.crystal);
        }

    },[getUserData])

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

    const [modal, setModal] = useState();
    const [ModalVisible, setModalVisible] = useState(false);
    const [modalChild, setModalChild] = useState('');
    const [marketchild, setMarketChild] = useState([]);
    const [shopchild, setShopChild] = useState([]);
    const [marketproduct, setMarketProduct] = useState([]);
    
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [userData,setUserData] = useState('');

    useEffect(() => {
        console.log('work_page::componentDidMount');

        setName(UserData_module.getUserLogin());
        setid(UserData_module.getUserID());

        (async () => {
            let userData = await Work_module.GetWorkData_async();
            setUserData(userData);
        })();

        return(() => {
            console.log('work_page::componentWillUnmount');
        });
    }, []);

    useEffect(()=>{
        if (!ModalVisible)
            setModalChild();
    }, [ModalVisible])


    const Market_Shop_Swap = () =>{

    };

    return (
        <div className={work_style.wrapper}>
            <div className={work_style.back}>
                <WorkContext.Provider value={{
                        getUserData: userData,
                        setModalVisible: setModalVisible,
                        setModalChild: setModalChild,
                        Market_Shop_Swap: Market_Shop_Swap,
                        getMarketChild: marketchild,
                        setMarketChild: setMarketChild,
                        getShopChild: shopchild,
                        setShopChild: setShopChild,
                        getMarketProduct: marketproduct
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
            <ModalWindow active={ModalVisible} setActive={setModalVisible}>
                {modalChild}
            </ModalWindow>
        </div>

    );
};



export default Work_Page
