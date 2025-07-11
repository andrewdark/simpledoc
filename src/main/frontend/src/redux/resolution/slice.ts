import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../models/IPageable";
import {IResolution} from "../../models/IResolution";
import {createResolution, deleteResolution, getAllResolution, getResolutionById, updateResolution} from "./operations";

interface ResolutionState {
    items: IResolution[];
    item: IResolution | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: ResolutionState = {
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
const handlePending = (state: ResolutionState) => {
    state.isLoading = true;
};
const handleRejected = (state: ResolutionState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const resolutionSlice = createSlice({
    name: "resolution",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<ResolutionState>) => {

        builder
            //createResolution
            .addCase(createResolution.pending, handlePending)
            .addCase(createResolution.rejected, handleRejected)
            .addCase(createResolution.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateResolution
            .addCase(updateResolution.pending, handlePending)
            .addCase(updateResolution.rejected, handleRejected)
            .addCase(updateResolution.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteResolution
            .addCase(deleteResolution.pending, handlePending)
            .addCase(deleteResolution.rejected, handleRejected)
            .addCase(deleteResolution.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllResolution
            .addCase(getAllResolution.pending, handlePending)
            .addCase(getAllResolution.rejected, handleRejected)
            .addCase(getAllResolution.fulfilled, (state: ResolutionState, action: PayloadAction<IPageable<IResolution>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getResolutionById
            .addCase(getResolutionById.pending, handlePending)
            .addCase(getResolutionById.rejected, handleRejected)
            .addCase(getResolutionById.fulfilled, (state: ResolutionState, action: PayloadAction<IResolution>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});

export const resolutionReducer = resolutionSlice.reducer;
