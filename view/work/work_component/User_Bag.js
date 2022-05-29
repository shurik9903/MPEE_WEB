import React, {useState, useEffect} from 'react';

import work_style from '../../css/work_style.css'; 

import {useWork} from '../Work_Page';
import {My_Scroll} from './Other_Component';
import {Bag_Cells} from './Bag_Cell';

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

export {User_Bag};