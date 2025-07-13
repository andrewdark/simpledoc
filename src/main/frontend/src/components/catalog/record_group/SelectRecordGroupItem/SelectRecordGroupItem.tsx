import {IRecordGroup, RecordGroupType} from "../../../../models/catalog/IRecordGroup";
import {FC} from "react";
import css from './SelectRecordGroupItem.module.css';
import {BsDownload, BsFillInboxFill, BsFillPeopleFill, BsFolderFill, BsUpload} from "react-icons/bs";
import {NavLink} from "react-router-dom";

interface RecordGroupItemProps {
    item: IRecordGroup,
    childrenLoadHandler: (id: number | null) => void
}

export const SelectRecordGroupItem: FC<RecordGroupItemProps> = ({item, childrenLoadHandler}) => {
    const renderSwitch = (type: typeof RecordGroupType[keyof typeof RecordGroupType]) => {
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

        RecordGroupType.NODE === item.recordGroupType ?
            <div key={item.id} className={css.selectRecordGroupItem} onClick={() => childrenLoadHandler(item.id)}>
                <div>{item.id}</div>
                <div>{renderSwitch(item.recordGroupType)}</div>
                <div>{item.name}</div>
            </div>
            :

            <NavLink to={`./registration/${item.id}`}>
                <div key={item.id} className={css.selectRecordGroupItem}>
                    <div>{item.id}</div>
                    <div>{renderSwitch(item.recordGroupType)}</div>
                    <div>{item.name}</div>
                </div>
            </NavLink>


    );
};
