import React, {useEffect} from 'react';

import work_style from '../../css/work_style.css'; 
import game_grid_style from '../../css/Game_Grid.css';

import {useWork} from '../Work_Page';
import {Market_Cells} from './Market_Cell';
import {Market_Modal} from './Market';

function Shopping_Cart() {
    return(
        <div className={`${work_style.view_menu} ${game_grid_style.bag}`}>
            <Shopping_Scroll id='Shop_Cart'>
            </Shopping_Scroll>
        </div>
    );
}


function Shopping_Scroll({id}) {

    const {setModalVisible, setModalChild, getMarketChild, setShopChild, getShopChild} = useWork();

    const drop = (e) => {
        e.preventDefault();

        const e_id = e.dataTransfer.getData('transfer');
        const cell = getMarketChild.find(element => {
            return element.props.id == e_id;
        }).props;

        
        const buy = slider_count => {
            
            const in_cell = getShopChild.findIndex(element => {
                return element.props.id == cell.id;
            });

            
            let new_cell;

            if (in_cell < 0){
                if (cell.InCount - slider_count <= 0) {
                    new_cell = <Market_Cells
                        id={cell.id} 
                        InType={cell.InType} 
                        InCount={cell.InCount} 
                        InPrice={cell.InPrice}/>;
                }else{
                    new_cell = <Market_Cells 
                        id={cell.id} 
                        InType={cell.InType} 
                        InCount={slider_count} 
                        InPrice={cell.InPrice}/>;
                }    

                setShopChild(prev => [...prev, new_cell]);

            }else{
                const cells_copy = getShopChild.map( element => {
                    if (element.props.id ==  cell.id){
                        return <Market_Cells
                        id={element.props.id}
                        InType={element.props.InType} 
                        InCount={element.props.InCount + slider_count} 
                        InPrice={element.props.InPrice}/> 
                    };
                    return element;
                });
                setShopChild(cells_copy);
            }


            
        };

        setModalChild(<Market_Modal count={cell.InCount} callback={buy}/>);
        setModalVisible(true);
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    useEffect(()=>{

        return(()=>{
            setShopChild([]);
        })

    },[])

    return(
        <div className={work_style.my_scroll} id={id} onDrop={drop} onDragOver={allowDrop}>
            {getShopChild}
        </div>
    )
};


export {Shopping_Cart, Shopping_Scroll};