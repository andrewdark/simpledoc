import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IRubric} from "../../../models/catalog/IRubric";
import {createRubric, deleteRubric, getAllRubric, getRubricById, updateRubric} from "./operations";

interface RubricState {
    items: IRubric[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: RubricState = {
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
                for (const item of state.items) {
                    if (item.id === action.payload.id) {
                        item.id = action.payload.id;

                        break;
                    }
                }
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
                state.items = action.payload.content;
                state.page = action.payload.page;
            })
            //getRubricById
            .addCase(getRubricById.pending, handlePending)
            .addCase(getRubricById.rejected, handleRejected)
            .addCase(getRubricById.fulfilled, (state: RubricState, action: PayloadAction<IRubric>) => {
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


export const rubricReducer = rubricSlice.reducer;
