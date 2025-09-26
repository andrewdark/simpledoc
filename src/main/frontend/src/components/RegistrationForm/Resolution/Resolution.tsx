import React from 'react';
import css from './Resolution.module.css';
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";

export const Resolution = () => {
    return (
        <div className={css.resolution}>
            <h5>Резолюції</h5>
            <div className={css.resolutionHeader}>
                <div className={css.formField}>
                    <label>Автор: </label>
                    <input/>
                </div>
                <div className= {css.resolutionDateGroup}>
                    <div className={css.formField}>
                        <label>Від: </label>
                        <input value="0000-00-00" disabled={true} className={css.resolutionDate}/>
                    </div>
                    <div className={css.formField}>
                        <label>План: </label>
                        <input value="0000-00-00" disabled={true} className={css.resolutionDate}/>
                    </div>
                    <div className={css.formField}>
                        <label>Факт: </label>
                        <input value="0000-00-00" disabled={true} className={css.resolutionDate}/>
                    </div>
                </div>
            </div>
            <div className={css.resolutionBody}>
                <div className={css.resolutionText}>
                    <div className={css.formField}>
                        <label>Текст: </label>
                        <div className={css.resolutionTextArea}>Lorem Ipsum is simply dummy text MSME</div>
                    </div>
                </div>

                <div className={css.performerList}>
                    <ul>
                        <li>Іванов І.І.</li>
                        <li>Петров П.П.</li>
                    </ul>
                </div>
                <div className={css.resolutionNavigation}>
                    <div onClick={() => {

                    }}><BsFileText/></div>
                    <div onClick={() => {

                    }}><BsFeather/></div>
                    <div onClick={() => {
                    }}><BsTrash/></div>
                </div>
            </div>
        </div>
    );
};
