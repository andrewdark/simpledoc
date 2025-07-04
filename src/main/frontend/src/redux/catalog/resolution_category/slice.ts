import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IResolutionCategory} from "../../../models/catalog/IResolutionCategory";

interface ResolutionCategoryState {
    resolutionCategories: IResolutionCategory[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: ResolutionCategoryState = {
    resolutionCategories: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
