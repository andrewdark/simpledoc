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
 * POST @ /citizenStatus
 * body: { }
 */
export const createCitizenStatus = createAsyncThunk(
    'citizenStatus/create',
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<ICitizenStatus>('/citizenStatus', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /citizenStatus/:id
 * body: { }
 */
export const updateCitizenStatus = createAsyncThunk(
    'citizenStatus/update',
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<ICitizenStatus>(`/citizenStatus/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /citizenStatus/:id
 * body: { }
 */
export const deleteCitizenStatus = createAsyncThunk(
    "citizenStatus/delete",
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/citizenStatus/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizenStatus/:id
 * body: { }
 */
export const getCitizenStatusById = createAsyncThunk(
    "citizenStatus/getCitizenStatusById",
    async (payload: CitizenStatusThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/citizenStatus/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizenStatus?page=0&size=10&sort=id&order=ASC
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
            const res = await $api.get(`/citizenStatus`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
