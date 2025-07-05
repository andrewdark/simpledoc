import {IResolution} from "../../../models/catalog/IResolution";
import {SortOrder} from "../../../models/IPageable";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";

interface ResolutionThunkPayload {
    id?: number;
    dto?: IResolution;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /resolution
 * body: { }
 */
export const createResolution = createAsyncThunk(
    'resolution/create',
    async (payload: ResolutionThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IResolution>('/resolution', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /resolution/:id
 * body: { }
 */
export const updateResolution = createAsyncThunk(
    'resolution/update',
    async (payload: ResolutionThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IResolution>(`/resolution/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /resolution/:id
 * body: { }
 */
export const deleteResolution = createAsyncThunk(
    "resolution/delete",
    async (payload: ResolutionThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/resolution/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /resolution/:id
 * body: { }
 */
export const getResolutionById = createAsyncThunk(
    "resolution/getResolutionById",
    async (payload: ResolutionThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/resolution/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /resolution?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllResolution = createAsyncThunk(
    "resolution/getAllResolution",
    async (payload:ResolutionThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/resolution`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
