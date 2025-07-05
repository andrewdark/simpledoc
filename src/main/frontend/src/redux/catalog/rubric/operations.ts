import {IRubric} from "../../../models/catalog/IRubric";
import {SortOrder} from "../../../models/IPageable";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";

interface RubricThunkPayload {
    id?: number;
    dto?: IRubric;
    number?: number;
    size?: number;
    sort?: string;
    order?: SortOrder;
}

/*
 * POST @ /rubric
 * body: { }
 */
export const createRubric = createAsyncThunk(
    'rubric/create',
    async (payload: RubricThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IRubric>('/rubric', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /rubric/:id
 * body: { }
 */
export const updateRubric = createAsyncThunk(
    'rubric/update',
    async (payload: RubricThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IRubric>(`/rubric/${payload.id}`, payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /rubric/:id
 * body: { }
 */
export const deleteRubric = createAsyncThunk(
    "rubric/delete",
    async (payload: RubricThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/rubric/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /rubric/:id
 * body: { }
 */
export const getRubricById = createAsyncThunk(
    "rubric/getRubricById",
    async (payload: RubricThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/rubric/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /rubric?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllRubric = createAsyncThunk(
    "rubric/getAllRubric",
    async (payload: RubricThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort: payload.sort,
                order: payload.order
            };
            const res = await $api.get(`/rubric`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
