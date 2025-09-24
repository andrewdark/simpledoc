import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IOrganization} from "../../../models/catalog/IOrganization";
import {
    createOrganization,
    deleteOrganization,
    getAllOrganization,
    getOrganizationById,
    updateOrganization,
    getAllOrganizationByName
} from "./operations";

interface OrganizationState {
    items: IOrganization[];
    item: IOrganization | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: OrganizationState = {
    items: [],
    item: null,
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}

const handlePending = (state: OrganizationState) => {
    state.isLoading = true;
};
const handleRejected = (state: OrganizationState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<OrganizationState>) => {

        builder
            //createOrganization
            .addCase(createOrganization.pending, handlePending)
            .addCase(createOrganization.rejected, handleRejected)
            .addCase(createOrganization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateOrganization
            .addCase(updateOrganization.pending, handlePending)
            .addCase(updateOrganization.rejected, handleRejected)
            .addCase(updateOrganization.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteOrganization
            .addCase(deleteOrganization.pending, handlePending)
            .addCase(deleteOrganization.rejected, handleRejected)
            .addCase(deleteOrganization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllOrganization
            .addCase(getAllOrganization.pending, handlePending)
            .addCase(getAllOrganization.rejected, handleRejected)
            .addCase(getAllOrganization.fulfilled, (state: OrganizationState, action: PayloadAction<IPageable<IOrganization>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getAllOrganization
            .addCase(getAllOrganizationByName.pending, handlePending)
            .addCase(getAllOrganizationByName.rejected, handleRejected)
            .addCase(getAllOrganizationByName.fulfilled, (state: OrganizationState, action: PayloadAction<IPageable<IOrganization>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getOrganizationById
            .addCase(getOrganizationById.pending, handlePending)
            .addCase(getOrganizationById.rejected, handleRejected)
            .addCase(getOrganizationById.fulfilled, (state: OrganizationState, action: PayloadAction<IOrganization>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});

export const organizationReducer = organizationSlice.reducer;
