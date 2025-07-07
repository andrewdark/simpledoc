import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IRubric} from "../../../models/catalog/IRubric";
import {createRubric, deleteRubric, getAllRubric, getRubricById, updateRubric} from "./operations";

interface RubricState {
    items: IRubric[];
    item: IRubric | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: RubricState = {
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

const handlePending = (state: RubricState) => {
    state.isLoading = true;
};
const handleRejected = (state: RubricState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const rubricSlice = createSlice({
    name: "rubric",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<RubricState>) => {

        builder
            //createRubric
            .addCase(createRubric.pending, handlePending)
            .addCase(createRubric.rejected, handleRejected)
            .addCase(createRubric.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateRubric
            .addCase(updateRubric.pending, handlePending)
            .addCase(updateRubric.rejected, handleRejected)
            .addCase(updateRubric.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteRubric
            .addCase(deleteRubric.pending, handlePending)
            .addCase(deleteRubric.rejected, handleRejected)
            .addCase(deleteRubric.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllRubric
            .addCase(getAllRubric.pending, handlePending)
            .addCase(getAllRubric.rejected, handleRejected)
            .addCase(getAllRubric.fulfilled, (state: RubricState, action: PayloadAction<IPageable<IRubric>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getRubricById
            .addCase(getRubricById.pending, handlePending)
            .addCase(getRubricById.rejected, handleRejected)
            .addCase(getRubricById.fulfilled, (state: RubricState, action: PayloadAction<IRubric>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});


export const rubricReducer = rubricSlice.reducer;
