import React, {useState, useEffect, useContext} from 'react';

import {UserData_module} from '../module/UserData';
import {Market_module, Work_module} from './module/work_module';

import work_style from '../css/work_style.css'; 
import user_image from '../image/prow_image.png';

import {Game_Window, Game_Grid} from './work_component/Game_Field';
import {ModalWindow} from './work_component/Modal_Window';
import {UserResourse} from './work_component/User_Resourse';
import {BarProvider} from './work_component/Bar';
import {My_Scroll} from './work_component/Other_Component';
import {Market_Cells} from './work_component/Market_Cell';

const WorkContext = React.createContext();

const useWork = () => {
    return useContext(WorkContext);
}

function Work_Page() {

    console.log('work_page::constructor')

    const [ModalVisible, setModalVisible] = useState(false);
    const [modalChild, setModalChild] = useState('');
    const [marketchild, setMarketChild] = useState([]);
    const [shopchild, setShopChild] = useState([]);
    const [marketproduct, setMarketProduct] = useState([]);
    
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [userData,setUserData] = useState('');

    useEffect(() => {
        console.log('work_page::componentDidMount');

        setName(UserData_module.getUserLogin());
        setid(UserData_module.getUserID());

        (async () => {
            let userData = await Work_module.GetWorkData_async();
            setUserData(userData);
        })();



        (async () => {

            let promise = await Market_module.GetMarketData_async();
            let Products = JSON.parse(promise.Products)

            let AllProd = [];

            Products.forEach(prod => 
                AllProd.push(<Market_Cells id={prod.id} InType={prod.block} InCount={prod.count} InPrice={prod.price}/>)
            )

            setMarketProduct(AllProd);
        })();


        return(() => {
            console.log('work_page::componentWillUnmount');
        });


    }, []);

    useEffect(()=>{
        if (!ModalVisible)
            setModalChild();
    }, [ModalVisible])


   

    return (
        <div className={work_style.wrapper}>
            <div className={work_style.back}>
                <WorkContext.Provider value={{
                        getUserData: userData,
                        setModalVisible: setModalVisible,
                        setModalChild: setModalChild,
                        getMarketChild: marketchild,
                        setMarketChild: setMarketChild,
                        getShopChild: shopchild,
                        setShopChild: setShopChild,
                        getMarketProduct: marketproduct
                    }}>
                    <div className={work_style.menu_wrapper}>
                        <div className={work_style.basic_menu_wrapper}>
                            <div className={work_style.scroll_wrapper}>
                                <My_Scroll>
                                    <li>
                                        <p>меню-текст-1</p>
                                    </li>
                                    <li>
                                        <p>меню-текст-2</p>
                                    </li>
                                    <li>
                                        <p>меню-текст-3</p>
                                    </li>
                                    <li>
                                        <p>меню-текст-4</p>
                                    </li>
                                    <li>
                                        <p>меню-текст-5</p>
                                    </li>
                                    <li>
                                        <p>меню-текст-6</p>
                                    </li>
                                    <li>
                                        <p>меню-текст-7</p>
                                    </li>
                                    <li>
                                        <p>меню-текст-8</p>
                                    </li>
                                </My_Scroll>
                            </div>
                            <div className={work_style.user_wrapper}>
                                <div className={work_style.user_info_wrapper}>
                                    <div className={work_style.user_id}>ID: {id}</div>
                                    <div className={work_style.user_name}>Name: {name}</div>
                                </div>
                                <div className={work_style.user_image_wrapper}>
                                    <img className={work_style.user_image} src={user_image}/>
                                </div>
                            </div>
                        </div>
                        <UserResourse/>
                    </div>
                    <div className={work_style.main}>
                        <div className={work_style.menu_bar}>
                            <BarProvider/>
                        </div>
                        <Game_Window>
                            <Game_Grid/>
                        </Game_Window>
                    </div>
                </WorkContext.Provider>
            </div>
            <ModalWindow active={ModalVisible} setActive={setModalVisible}>
                {modalChild}
            </ModalWindow>
        </div>

    );
};


export {useWork};
export default Work_Page
