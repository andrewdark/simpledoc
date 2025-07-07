import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {FC} from "react";
import {ICitizenCategory} from "../../../../models/catalog/ICitizenCategory";
import css from './CitizenCategoryItem.module.css';

interface CitizenCategoryItemProps {
    item: ICitizenCategory,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const CitizenCategoryItem: FC<CitizenCategoryItemProps> = ({
                                                                      item,
                                                                      readItemHandler,
                                                                      updateItemHandler,
                                                                      deleteItemHandler
                                                                  }) => {

    return (
        <div key={item.id} className={css.CitizenCategoryItem}>
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div className={css.itemNavigation}>
                <div onClick={() => {
                    readItemHandler(item.id ? item.id : 0)
                }}><BsFileText/></div>
                <div onClick={() => {
                    updateItemHandler(item.id ? item.id : 0)
                }}><BsFeather/></div>
                <div onClick={() => deleteItemHandler(item.id ? item.id : 0)}><BsTrash/></div>
            </div>
        </div>
    );
};
