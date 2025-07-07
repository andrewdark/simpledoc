import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {ICitizenStatus} from "../../../models/catalog/ICitizenStatus";
import {SortOrder} from "../../../models/IPageable";

interface CitizenStatusThunkPayload {
    id?: number;
    dto?: ICitizenStatus;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /citizen-status
 * body: { }
 */
export const createCitizenStatus = createAsyncThunk(
    'citizenStatus/create',
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<ICitizenStatus>('/citizen-status', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /citizen-status/:id
 * body: { }
 */
export const updateCitizenStatus = createAsyncThunk(
    'citizenStatus/update',
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<ICitizenStatus>(`/citizen-status/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /citizen-status/:id
 * body: { }
 */
export const deleteCitizenStatus = createAsyncThunk(
    "citizenStatus/delete",
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/citizen-status/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizen-status/:id
 * body: { }
 */
export const getCitizenStatusById = createAsyncThunk(
    "citizenStatus/getCitizenStatusById",
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/citizen-status/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizen-status?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllCitizenStatus = createAsyncThunk(
    "citizenStatus/getAllCitizenStatus",
    async (payload:CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/citizen-status`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
