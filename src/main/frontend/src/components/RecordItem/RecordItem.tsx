import React, {FC} from 'react';
import css from './RecordItem.module.css';
import {IRecord} from "../../models/IRecord";
import {
    BsDownload,
    BsFeather,
    BsFileText,
    BsFillInboxFill,
    BsFillPeopleFill,
    BsFolderFill,
    BsTrash,
    BsUpload
} from "react-icons/bs";
import {RecordGroupType} from "../../models/catalog/IRecordGroup";
import {DocGroupTypeIcon} from "../DocGroupTypeIcon/DocGroupTypeIcon";

interface RecordItemProps {
    item: IRecord,
}

export const RecordItem: FC<RecordItemProps> = ({item}) => {

    return (
        <div className={css.recordItem}>
            <div className={css.simpleColumn}>{item.id}</div>
            <div className={css.simpleColumn}><DocGroupTypeIcon type={item.recordGroup?.recordGroupType} size={"24px"}/>
            </div>
            <div className={css.unitedColumn}>
                <div className={css.regInfoGroup}>
                    <div>{item.orderNum}/{item.regNum}</div>
                    <div>{item.regDate ? new Date(item.regDate).toLocaleDateString() : ''}</div>
                </div>
                <div>
                    {item.content}
                </div>

            </div>

            <div className={css.itemNavigation}>
                <div onClick={() => {

                }}><BsFileText/></div>
                <div onClick={() => {

                }}><BsFeather/></div>
                <div onClick={() => {
                }}><BsTrash/></div>
            </div>
        </div>
    );
};
