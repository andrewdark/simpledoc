import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {FC} from "react";
import {IRecordGroup} from "../../../../models/catalog/IRecordGroup";
import css from './RecordGroupItem.module.css';

interface RecordGroupItemProps {
    item: IRecordGroup,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const RecordGroupItem: FC<RecordGroupItemProps> = ({
                                                              item,
                                                              readItemHandler,
                                                              updateItemHandler,
                                                              deleteItemHandler
                                                          }) => {

    return (
        <div key={item.id} className={css.recordGroupItem}>
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.createdAt}</div>
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
