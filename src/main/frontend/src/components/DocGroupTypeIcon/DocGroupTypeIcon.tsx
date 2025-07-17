import React, {FC} from 'react';
import {RecordGroupType} from "../../models/catalog/IRecordGroup";
import css from "./DocGroupTypeIcon.module.css";
import {BsDownload, BsFillInboxFill, BsFillPeopleFill, BsFolderFill, BsUpload} from "react-icons/bs";

interface DocGroupTypeIconProps{
    type: typeof RecordGroupType[keyof typeof RecordGroupType] | undefined
    size?: string;
}
export const DocGroupTypeIcon:FC<DocGroupTypeIconProps> = ({type, size}) => {

    const renderSwitch = (type: typeof RecordGroupType[keyof typeof RecordGroupType] | undefined) => {
        switch (type) {
            case RecordGroupType.NODE:
                return  <div className={css.node}><BsFolderFill size={size??"24px"}/></div>;
            case RecordGroupType.INCOMING:
                return  <div className={css.incoming}><BsDownload size={size??"24px"}/></div>;
            case RecordGroupType.CITIZEN:
                return  <div className={css.citizen}><BsFillPeopleFill size={size??"24px"}/></div>;
            case RecordGroupType.OUTGOING:
                return  <div className={css.outgoing}><BsUpload size={size??"24px"}/></div>;
            case RecordGroupType.INNER:
                return  <div className={css.inner}><BsFillInboxFill size={size??"24px"}/></div>;
            default:
                return  <div className={css.default}><BsFolderFill size={size??"24px"}/></div>;
        }
    };
    return (
        <>
            {renderSwitch(type)}
        </>
    );
};
