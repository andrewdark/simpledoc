import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IRecordGroup} from "../../../models/catalog/IRecordGroup";

interface RecordGroupState {
    recordGroups: IRecordGroup[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: RecordGroupState = {
    recordGroups: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
