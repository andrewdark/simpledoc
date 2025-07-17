import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import React, {FC} from "react";
import {IRecordGroup, RecordGroupType} from "../../../../models/catalog/IRecordGroup";
import css from './RecordGroupItem.module.css';
import {DocGroupTypeIcon} from "../../../../pages/DocGroupTypeIcon/DocGroupTypeIcon";

interface RecordGroupItemProps {
    item: IRecordGroup,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
    childrenLoadHandler: (id: number | null) => void
}

export const RecordGroupItem: FC<RecordGroupItemProps> = ({
                                                              item,
                                                              readItemHandler,
                                                              updateItemHandler,
                                                              deleteItemHandler,
                                                              childrenLoadHandler,
                                                          }) => {

    return (

        <div key={item.id} className={css.recordGroupItem} onClick={() => {
            if (RecordGroupType.NODE === item.recordGroupType) {
                childrenLoadHandler(item.id ? item.id : 0);
            }
        }}>
            <div className={css.simpleColumn}>{item.id}</div>
            <div className={css.simpleColumn}><DocGroupTypeIcon type={item.recordGroupType} size={"24px"}/></div>
            <div className={css.unitedColumn}>{item.name}</div>

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
