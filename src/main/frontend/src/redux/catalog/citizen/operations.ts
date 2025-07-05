import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {ICitizen} from "../../../models/catalog/ICitizen";
import {SortOrder} from "../../../models/IPageable";

interface CitizenThunkPayload {
    id?: number;
    dto?: ICitizen;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /citizen
 * body: { }
 */
export const createCitizen = createAsyncThunk(
    'citizen/create',
    async (payload: CitizenThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<ICitizen>('/citizen', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /citizen/:id
 * body: { }
 */
export const updateCitizen = createAsyncThunk(
    'citizen/update',
    async (payload: CitizenThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<ICitizen>(`/citizen/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /citizen/:id
 * body: { }
 */
export const deleteCitizen = createAsyncThunk(
    "citizen/delete",
    async (payload: CitizenThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/citizen/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizen/:id
 * body: { }
 */
export const getCitizenById = createAsyncThunk(
    "citizen/getCitizenById",
    async (payload: CitizenThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/citizen/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizen
 * body: { }
 */
export const getAllCitizen = createAsyncThunk(
    "citizen/getAllCitizen",
    async (payload:CitizenThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/citizen`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
