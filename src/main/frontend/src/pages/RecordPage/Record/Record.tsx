import React, {FC} from 'react';
import List from "../../../components/List/List";
import {IRecord} from "../../../models/IRecord";
import {RecordItem} from "../../../components/RecordItem/RecordItem";
import {deleteRecord, getRecordById} from "../../../redux/record/operations";
import {useAppDispatch} from "../../../hooks/redux";
import {useNavigate} from "react-router-dom";

interface Record {
    items: IRecord[],
}

const Record:FC<Record> = ({items}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const readItemHandler = (id: number) => {
        navigate(`/record/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getRecordById({id: id}))
            //dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteRecord({id: id}));
    };

    return (
        <div>
            <List items={items}
                  renderItems={(item: IRecord) => <RecordItem item={item} readItemHandler={readItemHandler}
                                                              updateItemHandler={updateItemHandler}
                                                              deleteItemHandler={deleteItemHandler}/>}></List>
        </div>
    );
};

export default Record;
