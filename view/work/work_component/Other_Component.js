import work_style from '../../css/work_style.css'; 

function My_Scroll({children}) {
    return(
        <div className={work_style.my_scroll}>
            {children}
        </div>
    );
};

export {My_Scroll};