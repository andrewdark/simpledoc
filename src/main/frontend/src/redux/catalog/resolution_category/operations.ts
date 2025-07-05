import {IResolutionCategory} from "../../../models/catalog/IResolutionCategory";
import {SortOrder} from "../../../models/IPageable";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";

interface ResolutionCategoryThunkPayload {
    id?: number;
    dto?: IResolutionCategory;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /resolutionCategory
 * body: { }
 */
export const createResolutionCategory = createAsyncThunk(
    'resolutionCategory/create',
    async (payload: ResolutionCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IResolutionCategory>('/resolutionCategory', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /resolutionCategory/:id
 * body: { }
 */
export const updateResolutionCategory = createAsyncThunk(
    'resolutionCategory/update',
    async (payload: ResolutionCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IResolutionCategory>(`/resolutionCategory/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /resolutionCategory/:id
 * body: { }
 */
export const deleteResolutionCategory = createAsyncThunk(
    "resolutionCategory/delete",
    async (payload: ResolutionCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/resolutionCategory/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /resolutionCategory/:id
 * body: { }
 */
export const getResolutionCategoryById = createAsyncThunk(
    "resolutionCategory/getResolutionCategoryById",
    async (payload: ResolutionCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/resolutionCategory/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /resolutionCategory?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllResolutionCategory = createAsyncThunk(
    "resolutionCategory/getAllResolutionCategory",
    async (payload:ResolutionCategoryThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/resolutionCategory`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
