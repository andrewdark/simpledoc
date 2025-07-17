import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../http";
import {SortOrder} from "../../models/IPageable";
import {IRecord} from "../../models/IRecord";

interface RecordThunkPayload {
    id?: number;
    dto?: IRecord;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /record
 * body: { }
 */
export const createRecord = createAsyncThunk(
    'record/create',
    async (payload: RecordThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IRecord>('/record', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /record/:id
 * body: { }
 */
export const updateRecord = createAsyncThunk(
    'record/update',
    async (payload: RecordThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IRecord>(`/record/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /record/:id
 * body: { }
 */
export const deleteRecord = createAsyncThunk(
    "record/delete",
    async (payload: RecordThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/record/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /record/:id
 * body: { }
 */
export const getRecordById = createAsyncThunk(
    "record/getRecordById",
    async (payload: RecordThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/record/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /record
 * body: { }
 */
export const getAllRecord = createAsyncThunk(
    "record/getAllRecord",
    async (payload:RecordThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/record`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
