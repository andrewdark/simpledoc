import {
    BsDownload,
    BsFeather,
    BsFileText,
    BsFillInboxFill,
    BsFillPeopleFill,
    BsFolderFill,
    BsTrash, BsUpload
} from "react-icons/bs";
import {FC} from "react";
import {IRecordGroup, RecordGroupType} from "../../../../models/catalog/IRecordGroup";
import css from './RecordGroupItem.module.css';

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

        <div key={item.id} className={css.recordGroupItem} onClick={() => {
            if (RecordGroupType.NODE === item.recordGroupType) {
                childrenLoadHandler(item.id ? item.id : 0);
            }
        }}>
            <div>{item.id}</div>
            <div>{renderSwitch(item.recordGroupType)}</div>
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
