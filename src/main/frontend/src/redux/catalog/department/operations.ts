import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {IDepartment} from "../../../models/catalog/IDepartment";
import {SortOrder} from "../../../models/IPageable";

interface DepartmentThunkPayload {
    id?: number;
    dto?: IDepartment;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
    searchQuery?:string;
}

/*
 * POST @ /department
 * body: { }
 */
export const createDepartment = createAsyncThunk(
    'department/create',
    async (payload: DepartmentThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IDepartment>('/department', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /department/:id
 * body: { }
 */
export const updateDepartment = createAsyncThunk(
    'department/update',
    async (payload: DepartmentThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IDepartment>(`/department/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /department/:id
 * body: { }
 */
export const deleteDepartment = createAsyncThunk(
    "department/delete",
    async (payload: DepartmentThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/department/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /department/:id
 * body: { }
 */
export const getDepartmentById = createAsyncThunk(
    "department/getDepartmentById",
    async (payload: DepartmentThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/department/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /department?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllDepartment = createAsyncThunk(
    "department/getAllDepartment",
    async (payload:DepartmentThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/department`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /department?name=dep-name-str&page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllDepartmentByName = createAsyncThunk(
    "department/getAllDepartmentByFullName",
    async (payload:DepartmentThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                name: payload.searchQuery,
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/department/search`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
