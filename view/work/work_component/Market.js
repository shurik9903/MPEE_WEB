import React, {useState, useEffect} from 'react';

import work_style from '../../css/work_style.css'; 
import game_grid_style from '../../css/Game_Grid.css';

import {useWork} from '../Work_Page';
import {useBar} from './Bar';
import {Market_Cells} from './Market_Cell';
import {useModal} from './Modal_Window';
import {Slider_Range} from './Slider';

function Market() {

    const {Shopping_Cart_Visible} = useBar();

    const {getMarketProduct, setMarketChild} = useWork();

    useEffect(()=>{

        console.log('Market::componentDidMount');

        Shopping_Cart_Visible(true);

        return() => {
            setMarketChild([]);
            Shopping_Cart_Visible(false);
        };
    }, [])

    useEffect(()=>{
        setMarketChild(getMarketProduct);
    },[getMarketProduct])

    return(
        <div className={`${work_style.view_menu} ${game_grid_style.market}`}>
            <Market_Scroll id='Market'>
            </Market_Scroll>
        </div>
    );

}


function Market_Scroll({children, id}){

    const {getMarketChild, setMarketChild, getMarketProduct, getShopChild} = useWork();

    useEffect(()=>{
        setMarketChild(children);
    },[children])

    useEffect(()=>{

        getShopChild.forEach(shop_element => {
            
            const in_cell = getMarketChild.findIndex(element => {
                return element.props.id == shop_element.props.id;
            });

            if (in_cell >= 0){

                const cells_copy = getMarketChild.map( element => {

                    if (element.props.id == shop_element.props.id){

                        if (element.props.InCount - shop_element.props.InCount <= 0){
                            return null;
                        }

                        return <Market_Cells
                        id={element.props.id}
                        InType={element.props.InType} 
                        InCount={element.props.InCount - shop_element.props.InCount} 
                        InPrice={element.props.InPrice}/> 
                    };

                    return element;
                }).filter(element => {
                    return element != null;
                });

                setMarketChild(cells_copy);
                
            }
        })
    },[getShopChild])

    return(
        <div className={work_style.my_scroll} id={id}>
            {getMarketChild}
        </div>
    )
}

function Market_Modal({but_apply_text, but_cancel_text, count, callback}) {

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
                    {but_apply_text}
                </div>
                <div className={work_style.cancel} onClick={() => {close()}}>
                    {but_cancel_text}
                </div>
            </div>
        </>
    )
}

export {Market, Market_Scroll, Market_Modal};