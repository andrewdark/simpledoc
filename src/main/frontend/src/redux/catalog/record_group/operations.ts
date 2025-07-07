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
 * POST @ /record-group
 * body: { }
 */
export const createRecordGroup = createAsyncThunk(
    'recordGroup/create',
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IRecordGroup>('/record-group', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /record-group/:id
 * body: { }
 */
export const updateRecordGroup = createAsyncThunk(
    'recordGroup/update',
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IRecordGroup>(`/record-group/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /record-group/:id
 * body: { }
 */
export const deleteRecordGroup = createAsyncThunk(
    "recordGroup/delete",
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/record-group/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /record-group/:id
 * body: { }
 */
export const getRecordGroupById = createAsyncThunk(
    "recordGroup/getRecordGroupById",
    async (payload: RecordGroupThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/record-group/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /record-group?page=0&size=10&sort=id&order=ASC
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
            const res = await $api.get(`/record-group`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
