import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {IRecordGroup} from "../../../models/catalog/IRecordGroup";

interface RecordGroupState {
    recordGroups: IRecordGroup[];
    isLoading: boolean;
    error: string;
}

const initialState: RecordGroupState = {
    recordGroups: [],
    isLoading: false,
    error: "",
}
