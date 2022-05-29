
import React, {useState, useEffect, useContext, useRef} from 'react';

import game_grid_style from '../../css/Game_Grid.css';
import work_style from '../../css/work_style.css'; 
import star_image from '../../image/791455802.jpg';

import {useWork} from '../Work_Page';
import {Work_CSS_module} from '../module/work_css_module'; 
import {Image_module} from '../../module/Image_module';
import {Work_module} from '../module/work_module';

function Game_Cells({cell_image = 'default', dropping = false}) {

    return(
        <div className={game_grid_style.game_cells} >
            <img draggable={false} src={Image_module[cell_image]}/>
        </div>
    );

};

function Neighbor_Player_Grid({id}) {

    const {AllNeigh} = useGameGrid();

    const [size, setSize] = useState(11);
    const [grid, setGrid] = useState(null);


    useEffect(() => {

        (async () => {

            let Cells = [];
            let Cell = null;
            let All_Cells = [];
            let user_id = AllNeigh[id];

            if (user_id >= 0){
                let promise = await Work_module.GetWorkData_async(user_id);
                Cells = JSON.parse(promise.Cell);
            }

            for (let i = 1; i <= size; i++){
                for (let j = 1; j <= size; j++){
                    Cell = Cells.find((data) => { return data.location.row == j && data.location.col == i})
                    All_Cells.push(<Game_Cells id={10 * (i + 1) + j + 1} cell_image={Cell != null ? Cell.type : 'default'}/> );    
                };
            };
            
            setGrid(All_Cells);
        })();

    },[AllNeigh]);

    return (
        <div className={game_grid_style.player_grid } style={{gridTemplateColumns: `repeat(${size}, 100px)`}}>
            {grid}
        </div>
    );
}


function Player_Grid({id}) {

    const {data} = useGameGrid();

    const [size, setSize] = useState(11);
    const [grid, setGrid] = useState(null);

    useEffect(() => {

        (async () => {

            let Cells = [];
            let Cell = null;
            let All_Cells = [];

            if (data)
                Cells = JSON.parse(data.Cell);

            for (let i = 1; i <= size; i++){
                for (let j = 1; j <= size; j++){
                    Cell = Cells.find((data) => { return data.location.row == j && data.location.col == i})
                    All_Cells.push(<Game_Cells id={10 * (i + 1) + j + 1} cell_image={Cell != null ? Cell.type : 'default'}/> );    
                };
            };
            
            setGrid(All_Cells);
        })();

    },[data]);

    return (
        <div className={game_grid_style.player_grid } style={{gridTemplateColumns: `repeat(${size}, 100px)`}}>
            {grid}
        </div>
    );
};


const GameGridContext = React.createContext();

const useGameGrid = () => {
    return useContext(GameGridContext);
}

function Game_Grid() {
    const [neighbours,setNeighbours] = useState({});
    const [playerData, setPlayerData] = useState(null);

    const {getUserData} = useWork();

    useEffect(() => {
        if (getUserData){
            setPlayerData(getUserData);
            setNeighbours(JSON.parse(getUserData.Neighbours));
        }
    },[getUserData]);

    return(
            <div className={game_grid_style.game_grid} >
                <GameGridContext.Provider value={{AllNeigh: neighbours, data: playerData}}>
                    <Neighbor_Player_Grid id={'TL'}/>
                    <Neighbor_Player_Grid id={'T'}/>
                    <Neighbor_Player_Grid id={'TR'}/>
                    <Neighbor_Player_Grid id={'L'}/>
                    <Player_Grid id={'player'}/>
                    <Neighbor_Player_Grid id={'R'}/>
                    <Neighbor_Player_Grid id={'DL'}/>
                    <Neighbor_Player_Grid id={'D'}/>
                    <Neighbor_Player_Grid id={'DR'}/>
                </GameGridContext.Provider>
            </div>
    );

};

function Game_Window({children}) {

    const scroll_comp = useRef(null);

    const setScrollRef = (element) => {
        scroll_comp.current = element
    };

    useEffect(() => {
        if (scroll_comp.current)    
            Work_CSS_module.My_Scroll(scroll_comp.current)
    },[]);

    return(
            <div className={work_style.game_window} ref={setScrollRef}>
                <div className={work_style.game}>
                    <div className={work_style.game_back} style={{backgroundImage:`url(${star_image})`}}/>
                    <div className={work_style.game_elements}>
                        {children}
                    </div>
                </div>
            </div>
    );

};


export {Game_Window, Game_Grid, Player_Grid, Neighbor_Player_Grid, Game_Cells};