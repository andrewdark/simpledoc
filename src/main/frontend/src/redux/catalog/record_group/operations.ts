import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {IRecordGroup} from "../../../models/catalog/IRecordGroup";
import {SortOrder} from "../../../models/IPageable";

interface RecordGroupThunkPayload {
    id?: number;
    dto?: IRecordGroup;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /recordGroup
 * body: { }
 */
export const createRecordGroup = createAsyncThunk(
    'recordGroup/create',
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IRecordGroup>('/recordGroup', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /recordGroup/:id
 * body: { }
 */
export const updateRecordGroup = createAsyncThunk(
    'recordGroup/update',
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IRecordGroup>(`/recordGroup/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /recordGroup/:id
 * body: { }
 */
export const deleteRecordGroup = createAsyncThunk(
    "recordGroup/delete",
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/recordGroup/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /recordGroup/:id
 * body: { }
 */
export const getRecordGroupById = createAsyncThunk(
    "recordGroup/getRecordGroupById",
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/recordGroup/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /recordGroup?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllRecordGroup = createAsyncThunk(
    "recordGroup/getAllRecordGroup",
    async (payload:RecordGroupThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/recordGroup`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
