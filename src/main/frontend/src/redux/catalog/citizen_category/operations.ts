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
 * POST @ /citizen-category
 * body: { }
 */
export const createCitizenCategory = createAsyncThunk(
    'citizenCategory/create',
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<ICitizenCategory>('/citizen-category', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /citizen-category/:id
 * body: { }
 */
export const updateCitizenCategory = createAsyncThunk(
    'citizenCategory/update',
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<ICitizenCategory>(`/citizen-category/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /citizen-category/:id
 * body: { }
 */
export const deleteCitizenCategory = createAsyncThunk(
    "citizenCategory/delete",
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/citizen-category/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizen-category/:id
 * body: { }
 */
export const getCitizenCategoryById = createAsyncThunk(
    "citizenCategory/getCitizenCategoryById",
    async (payload: CitizenCategoryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/citizen-category/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /citizen-category?page=0&size=10&sort=id&order=ASC
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
            const res = await $api.get(`/citizen-category`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
