import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {ICitizen} from "../../../models/catalog/ICitizen";

interface CitizenState {
    citizens: ICitizen[];
    isLoading: boolean;
    error: string;
}

const initialState: CitizenState = {
    citizens: [],
    isLoading: false,
    error: "",
}
