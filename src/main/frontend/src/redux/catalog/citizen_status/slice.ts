import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {ICitizenStatus} from "../../../models/catalog/ICitizenStatus";
import {
    createCitizenStatus,
    deleteCitizenStatus,
    getAllCitizenStatus,
    getCitizenStatusById,
    updateCitizenStatus
} from "./operations";

interface CitizenStatusState {
    items: ICitizenStatus[];
    item: ICitizenStatus | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: CitizenStatusState = {
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

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
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
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getCitizenStatusById
            .addCase(getCitizenStatusById.pending, handlePending)
            .addCase(getCitizenStatusById.rejected, handleRejected)
            .addCase(getCitizenStatusById.fulfilled, (state: CitizenStatusState, action: PayloadAction<ICitizenStatus>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});


export const citizenStatusReducer = citizenStatusSlice.reducer;
