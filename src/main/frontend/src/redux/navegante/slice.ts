import {createSlice} from "@reduxjs/toolkit";
import {INavegante} from "../../models/INavegante";

interface NaveganteState {
    navList: INavegante[];
}

const initialState: NaveganteState = {
    navList: [{id: -1, link: "/", title: "Головна"}]
}
export const naveganteSlice = createSlice({
    name: "navegante",
    initialState,
    reducers: {
        setNavegante(state, action) {
            state.navList = [...initialState.navList, action.payload];
        },
        addNavegante(state, action) {
            const lastIndex = state.navList.length - 1;
            const index = state.navList.findIndex(item => item.id === action.payload.id);
            if (index > 0 && index != lastIndex) {
                const myArray = state.navList.splice(index + 1, lastIndex);
                state.navList = [...state.navList];
            } else {
                state.navList = [...state.navList, action.payload];
            }

        },
        clearNavegante(state, action) {
            state.navList = initialState.navList;
        },
    }
});

export const {setNavegante, addNavegante, clearNavegante} = naveganteSlice.actions;
export const naveganteReducer = naveganteSlice.reducer;
