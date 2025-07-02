import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {IResolution} from "../../../models/catalog/IResolution";

interface ResolutionState {
    resolutions: IResolution[];
    isLoading: boolean;
    error: string;
}

const initialState: ResolutionState = {
    resolutions: [],
    isLoading: false,
    error: "",
}
