import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {ICitizen} from "../../../models/catalog/ICitizen";

interface CitizenState {
    citizens: ICitizen[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: CitizenState = {
    citizens: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
