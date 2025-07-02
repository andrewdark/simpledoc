import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {IRubric} from "../../../models/catalog/IRubric";

interface RubricState {
    rubrics: IRubric[];
    isLoading: boolean;
    error: string;
}

const initialState: RubricState = {
    rubrics: [],
    isLoading: false,
    error: "",
}
