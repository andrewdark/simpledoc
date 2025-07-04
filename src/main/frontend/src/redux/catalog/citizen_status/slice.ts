import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {ICitizenStatus} from "../../../models/catalog/ICitizenStatus";

interface CitizenStatusState {
    citizenStatuses: ICitizenStatus[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: CitizenStatusState = {
    citizenStatuses: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
