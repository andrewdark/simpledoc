import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IOrganization} from "../../../models/catalog/IOrganization";

interface OrganizationState {
    organizations: IOrganization[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: OrganizationState = {
    organizations: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}
