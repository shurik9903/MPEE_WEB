import React, {useState, useEffect} from 'react';

import {Image_module} from '../../module/Image_module';

import work_style from '../../css/work_style.css'; 

import {useWork} from '../Work_Page';

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


export {UserResourse};