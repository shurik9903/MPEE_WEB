import React, {useState, useEffect} from 'react';

import game_grid_style from '../../css/Game_Grid.css';
import {Image_module} from '../../module/Image_module';


function Market_Cells ({id, InType, InCount, InPrice}) {

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

export {Market_Cells};