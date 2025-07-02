import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {ICitizenCategory} from "../../../models/catalog/ICitizenCategory";

interface CitizenCategoryState {
    citizenCategories: ICitizenCategory[];
    isLoading: boolean;
    error: string;
}

const initialState: CitizenCategoryState = {
    citizenCategories: [],
    isLoading: false,
    error: "",
}
