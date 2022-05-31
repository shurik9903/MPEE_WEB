import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';

import game_grid_style from '../../css/Game_Grid.css';
import {Image_module} from '../../module/Image_module';


const Market_Cells = forwardRef(({id, InType, InCount, InPrice, cancel, draggable=true}, ref ) => {

    const [price, setPrice] = useState('');
    const [count, setCount] = useState(0);
    const [type, setType] = useState('');
    const [close, setClose] = useState('');

    const drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
    };

    const noAllowDrop = (e) => {
        e.stopPropagation();
    };

    useImperativeHandle(ref, ()=>({
        getId: () => id,
        getPrice: () => {return price},
        getCount: () => {return count},
        getType: () => {return type},
        setPrice,
        setCount,
        setType,
    }), [price, count, type]);

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

    },[]);

    useEffect(()=>{
        if (!draggable)
            setClose(<div className={game_grid_style.close_button} 
                onClick={()=>cancel(count, id)}>X</div>);
        else
            setClose();
    },[count]);

    useEffect(()=>{
        console.log('funcupdate');
    },[cancel])


    return(
        <div className={game_grid_style.market_cells} id={id} draggable={draggable} onDragStart={drag} onDragOver={noAllowDrop}>
            {close}
            <div className={game_grid_style.count_field}>
                {count}
            </div>
            <img className={game_grid_style.cells_head_image} draggable={false} src={Image_module[type]}/>
            <div className={game_grid_style.price}>
                {price}
            </div>
        </div>
    );

});

export {Market_Cells};