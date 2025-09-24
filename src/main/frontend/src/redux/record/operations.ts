import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../http";
import {IPageable, SortOrder} from "../../models/IPageable";
import {IRecord} from "../../models/IRecord";
import {IRecordSearchFilter} from "../../models/IRecordSearchFilter";

interface RecordThunkPayload {
    id?: number;
    dto?: IRecord;
    filter?:IRecordSearchFilter;
    number?: number;
    size?: number;
    sort?:string;
    multipleSort?:string[]
    order?:SortOrder;
    fileList?: File[];
}

/*
 * POST @ /record
 * body: { }
 */
export const createRecord = createAsyncThunk(
    'record/create',
    async (payload: RecordThunkPayload, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append(
                "data",
                new Blob([JSON.stringify(payload.dto)], { type: "application/json" })
            );
            console.log("payload.files: ", payload.fileList);
            payload.fileList?.forEach((file: File) => {
                formData.append("fileList", file);
            });
            console.log("FD: ",formData)
            const res = await $api.post<IRecord>('/record', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
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

/*
 * POST @ /record/search
 * body: { }
 */
export const getAllRecordByFilter = createAsyncThunk(
    'record/getAllRecordByFilter',
    async (payload: RecordThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };

            const res = await $api.post<IPageable<IRecord>>(`/record/search`, payload.filter,{ params: params});
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
