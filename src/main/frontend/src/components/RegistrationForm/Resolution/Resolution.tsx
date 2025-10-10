import React from 'react';
import css from './Resolution.module.css';
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

export const Resolution = () => {

    const navLeftBtn = () => {

    }
    const navRightBtn = () => {

    }

    return (
        <div className={css.resolution}>
            <div className={css.resolutionHeader}>
                <h5>Резолюції (0 з 0)</h5>
                <div className={css.resolutionNavigation}>
                    <div className={css.iterationButton}>
                        <button type="button" onClick={navLeftBtn}>
                            <FiChevronLeft size={16}/>
                        </button>
                        <button type="button" onClick={navRightBtn} >
                            <FiChevronRight size={16}/>
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={() => {

                        }}><BsFileText/></button>
                        <button type="button" onClick={() => {

                        }}><BsFeather/></button>
                        <button type="button" onClick={() => {
                        }}><BsTrash/></button>
                    </div>

                </div>
            </div>


            <div className={css.resolutionBody}>
                <div className={css.resolutionBodyInfo}>
                    <div className={css.formField}>
                        <label>Автор: </label>
                        <input/>
                    </div>
                    <div className={css.resolutionDateGroup}>
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
                <div className={css.resolutionBodyDetail}>
                    <div className={css.formField}>
                        <label>Текст: </label>
                        <div className={css.resolutionText}>Lorem Ipsum is simply dummy text MSME</div>
                    </div>
                    <div className={css.formField}>
                        <label>Виконавці: </label>
                        <div className={css.resolutionPerformer}>
                            <ul>
                                <li>Іванов І.І.</li>
                                <li>Петров П.П.</li>
                            </ul>
                        </div>
                </div>

                </div>


            </div>
        </div>
    );
};
