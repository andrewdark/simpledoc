import {IRecordGroup, RecordGroupType} from "../../../../models/catalog/IRecordGroup";
import React, {FC} from "react";
import css from './SelectRecordGroupItem.module.css';
import {BsDownload, BsFillInboxFill, BsFillPeopleFill, BsFolderFill, BsUpload} from "react-icons/bs";
import {NavLink} from "react-router-dom";
import {DocGroupTypeIcon} from "../../../../pages/DocGroupTypeIcon/DocGroupTypeIcon";

interface RecordGroupItemProps {
    item: IRecordGroup,
    childrenLoadHandler: (id: number | null) => void
}

export const SelectRecordGroupItem: FC<RecordGroupItemProps> = ({item, childrenLoadHandler}) => {

    return (

        RecordGroupType.NODE === item.recordGroupType ?
            <div key={item.id} className={css.selectRecordGroupItem} onClick={() => childrenLoadHandler(item.id)}>
                <div className={css.simpleColumn}>{item.id}</div>
                <div className={css.simpleColumn}><DocGroupTypeIcon type={item.recordGroupType} size={"24px"}/></div>
                <div className={css.unitedColumn}>{item.name}</div>
            </div>
            :

            <NavLink to={`./registration/${item.id}`}>
                <div key={item.id} className={css.selectRecordGroupItem}>
                    <div className={css.simpleColumn}>{item.id}</div>
                    <div className={css.simpleColumn}><DocGroupTypeIcon type={item.recordGroupType} size={"24px"}/></div>
                    <div className={css.unitedColumn}>{item.name}</div>
                </div>
            </NavLink>


    );
};
