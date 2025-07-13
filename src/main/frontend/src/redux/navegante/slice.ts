import {createSlice} from "@reduxjs/toolkit";
import {INavegante} from "../../models/INavegante";

interface NaveganteState {
    navList:INavegante[];
}

const initialState:NaveganteState = {
    navList:[{link:"/",title:"Головна"}]
}
export const naveganteSlice = createSlice({
    name: "navegante",
    initialState,
    reducers: {
        setNavegante(state, action) {
            state.navList = [...initialState.navList, action.payload];
        },
        addNavegante(state, action) {
            state.navList = [...state.navList, action.payload];
        },
        clearNavegante(state, action) {
            state.navList = initialState.navList;
        },
    }
});

export const {setNavegante, addNavegante, clearNavegante} = naveganteSlice.actions;
export const naveganteReducer = naveganteSlice.reducer;
