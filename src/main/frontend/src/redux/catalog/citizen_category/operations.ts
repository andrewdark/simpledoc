import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {ICitizenCategory} from "../../../models/catalog/ICitizenCategory";
import {SortOrder} from "../../../models/IPageable";

interface CitizenCategoryThunkPayload {
    id?: number;
    dto?: ICitizenCategory;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /citizenCategory
 * body: { }
 */
export const createCitizenCategory = createAsyncThunk(
    'citizenCategory/create',
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<ICitizenCategory>('/citizenCategory', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /citizenCategory/:id
 * body: { }
 */
export const updateCitizenCategory = createAsyncThunk(
    'citizenCategory/update',
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<ICitizenCategory>(`/citizenCategory/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /citizenCategory/:id
 * body: { }
 */
export const deleteCitizenCategory = createAsyncThunk(
    "citizenCategory/delete",
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/citizenCategory/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizenCategory/:id
 * body: { }
 */
export const getCitizenCategoryById = createAsyncThunk(
    "citizenCategory/getCitizenCategoryById",
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/citizenCategory/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizenCategory?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllCitizenCategory = createAsyncThunk(
    "citizenCategory/getAllCitizenCategory",
    async (payload:CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/citizenCategory`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
