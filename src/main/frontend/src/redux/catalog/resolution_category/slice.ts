import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {IResolutionCategory} from "../../../models/catalog/IResolutionCategory";

interface ResolutionCategoryState {
    resolutionCategories: IResolutionCategory[];
    isLoading: boolean;
    error: string;
}

const initialState: ResolutionCategoryState = {
    resolutionCategories: [],
    isLoading: false,
    error: "",
}
