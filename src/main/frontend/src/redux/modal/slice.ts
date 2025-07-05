import {createSlice} from "@reduxjs/toolkit";
import {boolean} from "yup";
import {IRubric} from "../../models/catalog/IRubric";
import {IPage} from "../../models/IPageable";

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
            console.log("action: ",action);
            state.visible = action.payload;
        },
    }
});

export const {setModal} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
