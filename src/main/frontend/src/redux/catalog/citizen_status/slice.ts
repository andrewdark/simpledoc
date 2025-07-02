import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {ICitizenStatus} from "../../../models/catalog/ICitizenStatus";

interface CitizenStatusState {
    citizenStatuses: ICitizenStatus[];
    isLoading: boolean;
    error: string;
}

const initialState: CitizenStatusState = {
    citizenStatuses: [],
    isLoading: false,
    error: "",
}
