import {IUser} from "../../models/IUser";
import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./operations";
import {IPageable} from "../../models/IPageable";

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: "",
}

const handlePending = (state: UserState) => {
    state.isLoading = true;
};
const handleRejected = (state: UserState, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
        builder
            .addCase(fetchUsers.pending, handlePending)
            .addCase(fetchUsers.fulfilled, (state: UserState, action: PayloadAction<IPageable<IUser>>) => {
                state.isLoading = false;
                state.error = '';
                state.users = action.payload.content;
            })
            .addCase(fetchUsers.rejected, handleRejected)
    }
});


export const userReducer = userSlice.reducer;
