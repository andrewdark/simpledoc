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

interface RecordItemProps {
    item: IRecord,
}
export const RecordItem:FC<RecordItemProps> = ({item}) => {
    const renderSwitch = (type: typeof RecordGroupType[keyof typeof RecordGroupType] | undefined) => {
        switch (type) {
            case RecordGroupType.NODE:
                return <BsFolderFill size="24px"/>;
            case RecordGroupType.INCOMING:
                return <BsDownload size="24px"/>;
            case RecordGroupType.CITIZEN:
                return <BsFillPeopleFill size="24px"/>;
            case RecordGroupType.OUTGOING:
                return <BsUpload size="24px"/>;
            case RecordGroupType.INNER:
                return <BsFillInboxFill size="24px"/>;
            default:
                return <BsFolderFill size="24px"/>;
        }
    }
    return (
        <div className={css.recordItem}>
            <div className={css.simpleColumn}>{item.id}</div>
            <div className={css.simpleColumn}>{renderSwitch(item.recordGroup?.recordGroupType)}</div>
            <div className={css.unitedColumn}>
                <div className={css.regInfoGroup}>
                    <div>{item.orderNum}/{item.regNum}</div>
                    <div>{new Date(item.regDate).toLocaleDateString()}</div>
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
                <div onClick={() => {}}><BsTrash/></div>
            </div>
        </div>
    );
};
