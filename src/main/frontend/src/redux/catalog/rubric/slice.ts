import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IRubric} from "../../../models/catalog/IRubric";

interface RubricState {
    rubrics: IRubric[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: RubricState = {
    rubrics: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
