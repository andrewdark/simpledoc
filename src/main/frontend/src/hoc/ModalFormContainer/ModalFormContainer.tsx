import React, {FC} from 'react';
import css from './ModalFormContainer.module.css';
interface ModalFormContainerProps{
    children: React.ReactNode;
    visible:boolean;
    setVisible :(modal:boolean)=>void
}

const ModalFormContainer:FC<ModalFormContainerProps> = ({children, visible, setVisible}) => {
    const rootCssClasses = [css.myModal];
    if(visible){
        rootCssClasses.push(css.active);
    }

    return (
        <div className={rootCssClasses.join(' ')} onClick={()=>{setVisible(false)}}>
            <div className={css.myModalContent} onClick={e=>{e.stopPropagation()}}>
                {children}
            </div>
        </div>
    );

}

export default ModalFormContainer;
