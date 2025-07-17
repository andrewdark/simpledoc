import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IRecordGroup} from "../../../models/catalog/IRecordGroup";
import {
    createRecordGroup, createRecordGroupChildren,
    deleteRecordGroup,
    getAllRecordGroup,
    getRecordGroupById, getRecordGroupChildren,
    updateRecordGroup
} from "./operations";
import RecordGroup from "../../../pages/catalog/RecordGroupPage/RecordGroup/RecordGroup";
import {modalSlice} from "../../modal/slice";

interface RecordGroupState {
    items: IRecordGroup[];
    item: IRecordGroup | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: RecordGroupState = {
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
const handlePending = (state: RecordGroupState) => {
    state.isLoading = true;
};
const handleRejected = (state: RecordGroupState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const recordGroupSlice = createSlice({
    name: "recordGroup",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<RecordGroupState>) => {

        builder
            //createRecordGroup
            .addCase(createRecordGroup.pending, handlePending)
            .addCase(createRecordGroup.rejected, handleRejected)
            .addCase(createRecordGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //createRecordGroupParent
            .addCase(createRecordGroupChildren.pending, handlePending)
            .addCase(createRecordGroupChildren.rejected, handleRejected)
            .addCase(createRecordGroupChildren.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateRecordGroup
            .addCase(updateRecordGroup.pending, handlePending)
            .addCase(updateRecordGroup.rejected, handleRejected)
            .addCase(updateRecordGroup.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteRecordGroup
            .addCase(deleteRecordGroup.pending, handlePending)
            .addCase(deleteRecordGroup.rejected, handleRejected)
            .addCase(deleteRecordGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllRecordGroup
            .addCase(getAllRecordGroup.pending, handlePending)
            .addCase(getAllRecordGroup.rejected, handleRejected)
            .addCase(getAllRecordGroup.fulfilled, (state: RecordGroupState, action: PayloadAction<IPageable<IRecordGroup>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getRecordGroupChildren
            .addCase(getRecordGroupChildren.pending, handlePending)
            .addCase(getRecordGroupChildren.rejected, handleRejected)
            .addCase(getRecordGroupChildren.fulfilled, (state: RecordGroupState, action: PayloadAction<IRecordGroup>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.children ?? initialState.items;
                state.page = initialState.page;
            })
            //getRecordGroupById
            .addCase(getRecordGroupById.pending, handlePending)
            .addCase(getRecordGroupById.rejected, handleRejected)
            .addCase(getRecordGroupById.fulfilled, (state: RecordGroupState, action: PayloadAction<IRecordGroup>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});


export const recordGroupReducer = recordGroupSlice.reducer;
