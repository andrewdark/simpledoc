import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../models/IPageable";
import {IRecord} from '../../models/IRecord';
import {
    createRecord,
    deleteRecord,
    getAllRecord,
    getAllRecordByFilter,
    getRecordById,
    updateRecord
} from "./operations";

interface RecordState {
    items: IRecord[];
    item: IRecord | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: RecordState = {
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

const handlePending = (state: RecordState) => {
    state.isLoading = true;
};
const handleRejected = (state: RecordState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const recordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {
        clearRecords(state) {
            state.item = initialState.item;
            state.items = initialState.items;
            state.page = initialState.page;
            state.isLoading = initialState.isLoading;
            state.error = initialState.error;
            console.log("clear");
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<RecordState>) => {

        builder
            //createRecord
            .addCase(createRecord.pending, handlePending)
            .addCase(createRecord.rejected, handleRejected)
            .addCase(createRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.item = action.payload;
                state.items.push(action.payload);
            })
            //updateRecord
            .addCase(updateRecord.pending, handlePending)
            .addCase(updateRecord.rejected, handleRejected)
            .addCase(updateRecord.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteRecord
            .addCase(deleteRecord.pending, handlePending)
            .addCase(deleteRecord.rejected, handleRejected)
            .addCase(deleteRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllRecord
            .addCase(getAllRecord.pending, handlePending)
            .addCase(getAllRecord.rejected, handleRejected)
            .addCase(getAllRecord.fulfilled, (state: RecordState, action: PayloadAction<IPageable<IRecord>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            .addCase(getAllRecordByFilter.pending, handlePending)
            .addCase(getAllRecordByFilter.rejected, handlePending)
            .addCase(getAllRecordByFilter.fulfilled, (state: RecordState, action: PayloadAction<IPageable<IRecord>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getRecordById
            .addCase(getRecordById.pending, handlePending)
            .addCase(getRecordById.rejected, handleRejected)
            .addCase(getRecordById.fulfilled, (state: RecordState, action: PayloadAction<IRecord>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});

export const {clearRecords} = recordSlice.actions;
export const recordReducer = recordSlice.reducer;
