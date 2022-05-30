import React, {useEffect, useState} from 'react';

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
    const [celldata, setCellData] = useState([]);

    const setData = (id, data) => {

        const find = celldata.findIndex(element => element.id == id)

        if (find < 0){
            setCellData(prev => [...prev, {id: id, data: data}])
        }else{
            setCellData((prev) => {
                return [
                  ...prev.slice(0, find),
                  {id: id, data: data},
                  ...prev.slice(find)
                ];
              });
        }
        
    }

    const cancel = (count, id) => {

        const apply_cancel = (count_cancel) => {

            if (slider_count <= 0)
                return;

            
            const in_cell = getShopChild.findIndex(element => element.props.id == id);

            console.log('incell ', in_cell);

            if (in_cell >= 0){
                
                console.log('incell2 ', in_cell);

                const cells_copy = getShopChild.map( element => {
                    if (element.props.id ==  id){

                        if (count - count_cancel <= 0)
                            return null;

                        return <Market_Cells
                        cancel={cancel}
                        draggable={false}
                        id={element.props.id}
                        InType={element.props.InType} 
                        InCount={element.props.InCount - count_cancel} 
                        InPrice={element.props.InPrice}/> 
                    };
                    return element;
                }).filter(element => {
                    return element != null;
                });

                setShopChild(cells_copy);
                
            }

        }; 

        setModalChild(<Market_Modal but_apply_text={'Вернуть'} but_cancel_text={'Отмена'} count={count} callback={apply_cancel}/>);
        setModalVisible(true);
    };
    
    const buy = (cell) => {

        const apply_buy = slider_count => {
            if (slider_count <= 0)
                return;

            console.log(getShopChild)
            
            const in_cell = getShopChild.findIndex(element => {
                return element.props.id == cell.id;
            });

            
            let new_cell;

            if (in_cell < 0){
                if (cell.InCount - slider_count <= 0) {
                    new_cell = <Market_Cells
                        data={setData}
                        cancel={cancel}
                        draggable={false}
                        id={cell.id} 
                        InType={cell.InType} 
                        InCount={cell.InCount} 
                        InPrice={cell.InPrice}/>;
                }else{
                    new_cell = <Market_Cells
                        data={setData}
                        cancel={cancel}
                        draggable={false} 
                        id={cell.id} 
                        InType={cell.InType} 
                        InCount={slider_count} 
                        InPrice={cell.InPrice}/>;
                }    

                setShopChild(prev => [...prev, new_cell]);
            }else{

                const Dcell = celldata.find(element => element.id == cell.id).data();
                const ICell = getShopChild.find(element => element.props.id == cell.id);
                console.log(Dcell);
                console.log(getShopChild);
                console.log('count   ',   Dcell.getCount);
                Dcell.setCount((Dcell.getCount + slider_count));
                // console.log(Dcell.data.getCount());
                // Dcell.data.setCount(Dcell.data.getCount() + slider_count);

                // console.log('cellcdada ' ,celldata);


                // getShopChild.forEach(element => {
                //     if (element.props.id ==  cell.id)
                //         console.log(element.props)
                // });
                // const cells_copy = getShopChild.map( element => {
                //     if (element.props.id ==  cell.id){
                //         return <Market_Cells
                //         cancel={cancel}
                //         draggable={false}
                //         id={element.props.id}
                //         InType={element.props.InType} 
                //         InCount={element.props.InCount + slider_count} 
                //         InPrice={element.props.InPrice}/> 
                //     };
                //     return element;
                // });

                // setShopChild(cells_copy);
                // console.log(find);

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