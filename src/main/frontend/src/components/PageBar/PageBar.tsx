import React, {FC} from "react";
import css from "./PageBar.module.css";
import {BiSolidChevronLeft, BiSolidChevronRight} from "react-icons/bi";
import {IPage} from "../../models/IPageable";

export type navLinks = { link: string, title: string };

interface PageBarProps {
    page: IPage,
    clickPage: (currentPage:number)=>void;
}

export const PageBar: FC<PageBarProps> = ({page,clickPage}) => {
    const pageList = Array.from({length: page.totalPages})

    return (
        <div className={css.PageBar}>
            <div>
                <button onClick={()=>{clickPage(page.number-1)}}><BiSolidChevronLeft/></button>
            </div>
            <div className={css.NumbersList}>{pageList.map((_, index) => {
                    // Визначаємо, чи поточний індекс відповідає нашому цільовому індексу
                    const isSpecialDiv = index === page.number;
                    // Створюємо динамічний className
                    const divClassName = isSpecialDiv ? css['current'] : css['available'];

                    return (
                        <div key={index} className={divClassName}>
                            <button onClick={()=>{clickPage(index)}}>{index + 1}</button>
                        </div>
                    )
                }
            )}</div>
            <div>
                <button onClick={()=>{clickPage(page.number+1)}}><BiSolidChevronRight/></button>
            </div>
        </div>
    );
}
