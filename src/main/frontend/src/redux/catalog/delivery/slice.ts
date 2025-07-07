import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPage, IPageable} from "../../../models/IPageable";
import {IDelivery} from "../../../models/catalog/IDelivery";
import {createDelivery, deleteDelivery, getAllDelivery, getDeliveryById, updateDelivery} from "./operations";

interface DeliveryState {
    items: IDelivery[];
    item: IDelivery | null;
    page: IPage;
    isLoading: boolean;
    error: string;
}

const initialState: DeliveryState = {
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

const handlePending = (state: DeliveryState) => {
    state.isLoading = true;
};
const handleRejected = (state: DeliveryState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<DeliveryState>) => {

        builder
            //createDelivery
            .addCase(createDelivery.pending, handlePending)
            .addCase(createDelivery.rejected, handleRejected)
            .addCase(createDelivery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.items.push(action.payload);
            })
            //updateDelivery
            .addCase(updateDelivery.pending, handlePending)
            .addCase(updateDelivery.rejected, handleRejected)
            .addCase(updateDelivery.fulfilled, (state, action) => {
                state.isLoading = false;

                const newItems = [...state.items];
                const index = newItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    newItems[index] = action.payload;
                }
                state.items = newItems;
                state.item = null;
            })
            //deleteDelivery
            .addCase(deleteDelivery.pending, handlePending)
            .addCase(deleteDelivery.rejected, handleRejected)
            .addCase(deleteDelivery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload
                );
                state.items.splice(index, 1);
            })
            //getAllDelivery
            .addCase(getAllDelivery.pending, handlePending)
            .addCase(getAllDelivery.rejected, handleRejected)
            .addCase(getAllDelivery.fulfilled, (state: DeliveryState, action: PayloadAction<IPageable<IDelivery>>) => {
                state.isLoading = false;
                state.error = '';
                state.items = action.payload?.content ?? initialState.items;
                state.page = action.payload?.page ?? initialState.page;
            })
            //getDeliveryById
            .addCase(getDeliveryById.pending, handlePending)
            .addCase(getDeliveryById.rejected, handleRejected)
            .addCase(getDeliveryById.fulfilled, (state: DeliveryState, action: PayloadAction<IDelivery>) => {
                state.isLoading = false;
                state.error = '';
                state.item = action.payload;
            })
    }
});


export const deliveryReducer = deliverySlice.reducer;
