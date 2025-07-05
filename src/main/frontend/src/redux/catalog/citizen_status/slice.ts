import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {ICitizenStatus} from "../../../models/catalog/ICitizenStatus";
import {createCitizenStatus, deleteCitizenStatus, getAllCitizenStatus, getCitizenStatusById, updateCitizenStatus} from "./operations";

interface CitizenStatusState {
    items: ICitizenStatus[];
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: CitizenStatusState = {
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

const handlePending = (state: CitizenStatusState) => {
    state.isLoading = true;
};
const handleRejected = (state: CitizenStatusState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const citizenStatusSlice = createSlice({
    name: "citizenStatus",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<CitizenStatusState>) => {

        builder
            //createCitizenStatus
            .addCase(createCitizenStatus.pending, handlePending)
            .addCase(createCitizenStatus.rejected, handleRejected)
            .addCase(createCitizenStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateCitizenStatus
            .addCase(updateCitizenStatus.pending, handlePending)
            .addCase(updateCitizenStatus.rejected, handleRejected)
            .addCase(updateCitizenStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                for (const item of state.items) {
                    if (item.id === action.payload.id) {
                        item.id = action.payload.id;

                        break;
                    }
                }
            })
            //deleteCitizenStatus
            .addCase(deleteCitizenStatus.pending, handlePending)
            .addCase(deleteCitizenStatus.rejected, handleRejected)
            .addCase(deleteCitizenStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllCitizenStatus
            .addCase(getAllCitizenStatus.pending, handlePending)
            .addCase(getAllCitizenStatus.rejected, handleRejected)
            .addCase(getAllCitizenStatus.fulfilled, (state: CitizenStatusState, action: PayloadAction<IPageable<ICitizenStatus>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload.content;
                state.page = action.payload.page;
            })
            //getCitizenStatusById
            .addCase(getCitizenStatusById.pending, handlePending)
            .addCase(getCitizenStatusById.rejected, handleRejected)
            .addCase(getCitizenStatusById.fulfilled, (state: CitizenStatusState, action: PayloadAction<ICitizenStatus>) => {
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


export const citizenStatusReducer = citizenStatusSlice.reducer;
