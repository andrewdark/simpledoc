import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IResolutionCategory} from "../../../models/catalog/IResolutionCategory";
import {createResolutionCategory, deleteResolutionCategory, getAllResolutionCategory, getResolutionCategoryById, updateResolutionCategory} from "./operations";

interface ResolutionCategoryState {
    items: IResolutionCategory[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: ResolutionCategoryState = {
    items: [],
    page: {
        "size": 10,
        "number": 0,
        "totalElements": 0,
        "totalPages": 0
    },
    isLoading: false,
    error: "",
}

const handlePending = (state: ResolutionCategoryState) => {
    state.isLoading = true;
};
const handleRejected = (state: ResolutionCategoryState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const resolutionCategorySlice = createSlice({
    name: "resolutionCategory",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<ResolutionCategoryState>) => {

        builder
            //createResolutionCategory
            .addCase(createResolutionCategory.pending, handlePending)
            .addCase(createResolutionCategory.rejected, handleRejected)
            .addCase(createResolutionCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateResolutionCategory
            .addCase(updateResolutionCategory.pending, handlePending)
            .addCase(updateResolutionCategory.rejected, handleRejected)
            .addCase(updateResolutionCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                for (const item of state.items) {
                    if (item.id === action.payload.id) {
                        item.id = action.payload.id;

                        break;
                    }
                }
            })
            //deleteResolutionCategory
            .addCase(deleteResolutionCategory.pending, handlePending)
            .addCase(deleteResolutionCategory.rejected, handleRejected)
            .addCase(deleteResolutionCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllResolutionCategory
            .addCase(getAllResolutionCategory.pending, handlePending)
            .addCase(getAllResolutionCategory.rejected, handleRejected)
            .addCase(getAllResolutionCategory.fulfilled, (state: ResolutionCategoryState, action: PayloadAction<IPageable<IResolutionCategory>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload.content;
                state.page = action.payload.page;
            })
            //getResolutionCategoryById
            .addCase(getResolutionCategoryById.pending, handlePending)
            .addCase(getResolutionCategoryById.rejected, handleRejected)
            .addCase(getResolutionCategoryById.fulfilled, (state: ResolutionCategoryState, action: PayloadAction<IResolutionCategory>) => {
                state.isLoading = false;
                state.error = '';
                state.items = [];
                state.page = {
                    "size": 1,
                    "number": 0,
                    "totalElements": 0,
                    "totalPages": 0
                }
                state.items.push(action.payload);
            })
    }
});


export const resolutionCategoryReducer = resolutionCategorySlice.reducer;
