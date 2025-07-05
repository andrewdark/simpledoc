import React, {FC} from 'react';
import css from './ModalFormContainer.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setModal} from "../../redux/modal/slice";

interface ModalFormContainerProps {
    children: React.ReactNode;
}

const ModalFormContainer: FC<ModalFormContainerProps> = ({children}) => {
    const dispatch = useAppDispatch();
    const isVisible: boolean = useAppSelector(state => state.modalReducer.visible);
    const rootCssClasses = [css.myModal];
    if (isVisible) {
        rootCssClasses.push(css.active);
    }

    return (
        <div className={rootCssClasses.join(' ')} onClick={() => {
            dispatch(setModal(false));
        }}>
            <div className={css.myModalContent} onClick={e => {
                e.stopPropagation();
            }}>
                {children}
            </div>
        </div>
    );

}

export default ModalFormContainer;
