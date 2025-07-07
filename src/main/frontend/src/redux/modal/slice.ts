import {createSlice} from "@reduxjs/toolkit";

interface ModalState {
    visible:boolean;
}

const initialState:ModalState = {
    visible:false
}
export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal(state, action) {
            state.visible = action.payload;
        },
    }
});

export const {setModal} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
