import React, {useEffect, useState, useRef, useCallback} from 'react';

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
    const CellRef = useRef([]);
    const ChildRef = useRef();
    const fRef = useRef();

    
    ChildRef.current = getShopChild;

    const AddToRef = (element) => {
        if (element){
            const findRef = getShopChild.findIndex(element=> element.getId() == element.getId()) 
            if (findRef < 0)
                CellRef.current.push(element)
            else
                CellRef.current[findRef] = element
        }
    };    

    const cancel = (count, id) => {

        const apply_cancel = count_cancel => {

            console.log(getShopChild)

            if (count_cancel <= 0)
                return;
 
            const in_cell = getShopChild.findIndex(element => element.props.id == id);

            if (in_cell >= 0){
                
                console.log('incell2 ', in_cell);

                const cell_update = CellRef.current.find(element=> element.getId() == cell.id)
                if (cell_update.getCount() - count_cancel <= 0){
                    setShopChild(prev => prev.filter((element) => { 
                        return element !== cell_update.getId(); 
                    }));
                }else{
                    console.log("test");
                    cell_update.setCount(cell_update.getCount() - count_cancel);
                }
            }

        }; 

        setModalChild(<Market_Modal but_apply_text={'Вернуть'} but_cancel_text={'Отмена'} count={count} callback={apply_cancel}/>);
        setModalVisible(true);
    };

    useEffect(()=>{
        fRef.current = cancel;
    },[getShopChild])

    const buy = (cell) => {

        const apply_buy = slider_count => {

            if (slider_count <= 0)
                return;

            console.log('start ',getShopChild)
            
            const in_cell = getShopChild.findIndex(element => {
                return element.props.id == cell.id;
            });

            
            let new_cell;

            if (in_cell < 0){
                if (cell.InCount - slider_count <= 0) {
                    new_cell = <Market_Cells
                        cancel={fRef}
                        draggable={false}
                        id={cell.id} 
                        InType={cell.InType} 
                        InCount={cell.InCount} 
                        InPrice={cell.InPrice}
                        ref={AddToRef}/>;
                }else{
                    new_cell = <Market_Cells
                        cancel={fRef}
                        draggable={false} 
                        id={cell.id} 
                        InType={cell.InType} 
                        InCount={slider_count} 
                        InPrice={cell.InPrice}
                        ref={AddToRef}/>;
                }    

                setShopChild(prev => [...prev, new_cell]);
            }else{

                const cell_update = CellRef.current.find(element=> element.getId() == cell.id)
                cell_update.setCount(cell_update.getCount() + slider_count);
                console.log('end ',getShopChild);
            }
        };

        setModalChild(<Market_Modal but_apply_text={'Купить'} but_cancel_text={'Отмена'} count={cell.InCount} callback={apply_buy}/>);
        setModalVisible(true);
    }   

    const drop = (e) => {
        e.preventDefault();

        const e_id = e.dataTransfer.getData('transfer');
        const cell = getMarketChild.find(element => {
            return element.props.id == e_id;
        }).props;

        buy(cell);
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