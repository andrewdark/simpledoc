import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api, BASE_URL} from "../../http";
import {RootState} from "../store";
import {ISignUpRequest} from "../../models/auth/ISignUpRequest";
import {ISignInRequest} from "../../models/auth/ISignInRequest";
import {ISignUpResponse} from "../../models/auth/ISignUpResponse";
import {ISignInResponse} from "../../models/auth/ISignInResponse";
import {isExpired, decodeToken} from "react-jwt";
import {IUser} from "../../models/IUser";
import axios from "axios";
import {AuthResponse} from "../../models/auth/AuthResponse";

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
    'auth/register',
    async (credentials: ISignUpRequest, thunkAPI) => {
        try {
            const res = await $api.post<ISignUpResponse>('/auth/signup', credentials);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials: ISignInRequest, thunkAPI) => {
        try {
            const res = await $api.post<ISignInResponse>('/auth/signin', credentials);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await $api.post('/auth/logout');
        // After a successful logout, remove the token from the HTTP header
        //clearAuthHeader();
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/*
 * GET @ /auth/me
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
    'auth/refreshUser',
    async (_, thunkAPI) => {
        // Reading the token from the state via getState()
        const state: RootState = <RootState>thunkAPI.getState();
        const persistedToken = state.authReducer.accessToken;

        if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }
        console.log("TOKEN EXPIRE: ", isExpired(persistedToken));
        // if (isExpired(persistedToken)) {
        //     return thunkAPI.rejectWithValue('Token expired');
        // }
        try {
            // If there is a token, add it to the HTTP header and perform the request
           // setAuthHeader(persistedToken); --> move to interceptor
            const res = await $api.get<IUser>('/user/me');
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, thunkAPI) => {
        try {
            const res = await axios.post<AuthResponse>(`${BASE_URL}/auth/refresh`, {withCredentials: true})
            const persistedToken = res.data.accessToken;
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });
