import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {ICitizenCategory} from "../../../models/catalog/ICitizenCategory";
import {
    createCitizenCategory,
    deleteCitizenCategory,
    getAllCitizenCategory,
    getCitizenCategoryById,
    updateCitizenCategory
} from "./operations";

interface CitizenCategoryState {
    items: ICitizenCategory[];
    item: ICitizenCategory | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: CitizenCategoryState = {
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

const handlePending = (state: CitizenCategoryState) => {
    state.isLoading = true;
};
const handleRejected = (state: CitizenCategoryState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const citizenCategorySlice = createSlice({
    name: "citizenCategory",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<CitizenCategoryState>) => {

        builder
            //createCitizenCategory
            .addCase(createCitizenCategory.pending, handlePending)
            .addCase(createCitizenCategory.rejected, handleRejected)
            .addCase(createCitizenCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateCitizenCategory
            .addCase(updateCitizenCategory.pending, handlePending)
            .addCase(updateCitizenCategory.rejected, handleRejected)
            .addCase(updateCitizenCategory.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteCitizenCategory
            .addCase(deleteCitizenCategory.pending, handlePending)
            .addCase(deleteCitizenCategory.rejected, handleRejected)
            .addCase(deleteCitizenCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllCitizenCategory
            .addCase(getAllCitizenCategory.pending, handlePending)
            .addCase(getAllCitizenCategory.rejected, handleRejected)
            .addCase(getAllCitizenCategory.fulfilled, (state: CitizenCategoryState, action: PayloadAction<IPageable<ICitizenCategory>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getCitizenCategoryById
            .addCase(getCitizenCategoryById.pending, handlePending)
            .addCase(getCitizenCategoryById.rejected, handleRejected)
            .addCase(getCitizenCategoryById.fulfilled, (state: CitizenCategoryState, action: PayloadAction<ICitizenCategory>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});


export const citizenCategoryReducer = citizenCategorySlice.reducer;
