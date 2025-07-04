import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IResolution} from "../../../models/catalog/IResolution";

interface ResolutionState {
    resolutions: IResolution[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: ResolutionState = {
    resolutions: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
