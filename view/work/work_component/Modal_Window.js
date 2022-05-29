import React, {useContext} from 'react';

import modal_style from '../../css/Modal_style.css';

const ModalContext = React.createContext();

const useModal = () => {
    return useContext(ModalContext);
}

function ModalWindow({active, setActive, children}){

    const close = () => {
        setActive(false);
    }
    
    return(
        <div className={active ? `${modal_style.modal} ${modal_style.active}` : modal_style.modal} onClick={close}>
            <div className={active ? `${modal_style.modal_body} ${modal_style.active}` : modal_style.modal_body} onClick={e => e.stopPropagation()}>
                <div className={modal_style.close} onClick={close}>X</div>
                <ModalContext.Provider value={{
                    close: close
                }}>
                    {children}
                </ModalContext.Provider>
            </div>
        </div>
    );

};

export {ModalWindow, useModal}