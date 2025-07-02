import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPageable} from "../../../models/IPageable";
import {IDepartment} from "../../../models/catalog/IDepartment";

interface DepartmentState {
    departments: IDepartment[];
    isLoading: boolean;
    error: string;
}

const initialState: DepartmentState = {
    departments: [],
    isLoading: false,
    error: "",
}
