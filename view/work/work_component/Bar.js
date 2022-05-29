import React, {useState, useEffect, useContext, useRef} from 'react';

import work_style from '../../css/work_style.css'; 
import {My_Scroll} from './Other_Component'; 
import {Shopping_Cart} from './Shop_Cart'; 
import {Market} from './Market';
import {User_Bag} from './User_Bag';


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

export {BarProvider, useBar, Bar_Menu};