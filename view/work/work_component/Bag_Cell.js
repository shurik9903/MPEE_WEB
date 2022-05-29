import React, {useState, useEffect} from 'react';

import game_grid_style from '../../css/Game_Grid.css';
import {Image_module} from '../../module/Image_module';

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


export {Bag_Cells};