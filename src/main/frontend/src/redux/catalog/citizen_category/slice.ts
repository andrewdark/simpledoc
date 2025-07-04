import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {ICitizenCategory} from "../../../models/catalog/ICitizenCategory";

interface CitizenCategoryState {
    citizenCategories: ICitizenCategory[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: CitizenCategoryState = {
    citizenCategories: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
