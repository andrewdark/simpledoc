import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {ICitizen} from "../../../models/catalog/ICitizen";
import {
    createCitizen,
    deleteCitizen,
    getAllCitizen,
    getAllCitizenByFullName,
    getCitizenById,
    updateCitizen
} from "./operations";

interface CitizenState {
    items: ICitizen[];
    item: ICitizen | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: CitizenState = {
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

const handlePending = (state: CitizenState) => {
    state.isLoading = true;
};
const handleRejected = (state: CitizenState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const citizenSlice = createSlice({
    name: "citizen",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<CitizenState>) => {

        builder
            //createCitizen
            .addCase(createCitizen.pending, handlePending)
            .addCase(createCitizen.rejected, handleRejected)
            .addCase(createCitizen.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateCitizen
            .addCase(updateCitizen.pending, handlePending)
            .addCase(updateCitizen.rejected, handleRejected)
            .addCase(updateCitizen.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteCitizen
            .addCase(deleteCitizen.pending, handlePending)
            .addCase(deleteCitizen.rejected, handleRejected)
            .addCase(deleteCitizen.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllCitizen
            .addCase(getAllCitizen.pending, handlePending)
            .addCase(getAllCitizen.rejected, handleRejected)
            .addCase(getAllCitizen.fulfilled, (state: CitizenState, action: PayloadAction<IPageable<ICitizen>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getAllCitizenByFullName
            .addCase(getAllCitizenByFullName.pending, handlePending)
            .addCase(getAllCitizenByFullName.rejected, handleRejected)
            .addCase(getAllCitizenByFullName.fulfilled, (state: CitizenState, action: PayloadAction<IPageable<ICitizen>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getCitizenById
            .addCase(getCitizenById.pending, handlePending)
            .addCase(getCitizenById.rejected, handleRejected)
            .addCase(getCitizenById.fulfilled, (state: CitizenState, action: PayloadAction<ICitizen>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});


export const citizenReducer = citizenSlice.reducer;
