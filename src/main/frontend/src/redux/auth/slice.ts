import {IUser} from "../../models/IUser";
import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {logIn, logOut, refreshToken, refreshUser, register} from "./operations";
import {ISignInResponse} from "../../models/auth/ISignInResponse";
import {ISignUpResponse} from "../../models/auth/ISignUpResponse";
import {AuthResponse} from "../../models/auth/AuthResponse";

interface AuthState {
    userId: null | number,
    roles: null | string[],
    user: null | IUser,
    accessToken: null | string,
    isLoggedIn: boolean,
    isRefreshing: boolean,
    isLoading: boolean,
    error: null | string,
}

const initialState: AuthState = {
    userId: null,
    roles:null,
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // refreshToken(state, action: PayloadAction<string>) {
        //     console.log("REFRESH AUTH STATE: ", action.payload);
        //     state.accessToken = action.payload;
        // }
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder
            .addCase(register.fulfilled, (state: AuthState, action: PayloadAction<ISignUpResponse>) => {
                state.userId = action.payload.userId;
                state.roles = action.payload.user?.roleList;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logIn.fulfilled, (state: AuthState, action: PayloadAction<ISignInResponse>) => {
                state.userId = action.payload.userId;
                state.user = action.payload.user;
                state.roles = action.payload.user?.roleList;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logOut.fulfilled, (state: AuthState) => {
                state.user = initialState.user;
                state.roles = initialState.roles;
                state.userId = initialState.userId;
                state.accessToken = initialState.accessToken;
                state.isLoggedIn = initialState.isLoggedIn;
                state.isRefreshing = initialState.isRefreshing;
            })
            .addCase(refreshUser.pending, (state: AuthState) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state: AuthState, action: PayloadAction<IUser>) => {
                state.userId = action.payload.userId;
                state.user = action.payload;
                state.roles = action.payload?.roleList;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state: AuthState) => {
                state.isRefreshing = false;
            })
            .addCase(refreshToken.pending, (state: AuthState) => {
                state.isRefreshing = true;
            })
            .addCase(refreshToken.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
                state.userId = action.payload.userId;
                state.user = action.payload.user;
                state.roles = action.payload.user?.roleList;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshToken.rejected, (state: AuthState) => {
                state.isRefreshing = false;
            });
    },

})

export const authReducer = authSlice.reducer;
//export const {refreshToken} = authSlice.actions;
