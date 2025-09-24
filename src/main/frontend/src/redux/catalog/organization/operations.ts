import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {IOrganization} from "../../../models/catalog/IOrganization";
import {SortOrder} from "../../../models/IPageable";

interface OrganizationThunkPayload {
    id?: number;
    dto?: IOrganization;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
    searchQuery?:string;
}

/*
 * POST @ /organization
 * body: { }
 */
export const createOrganization = createAsyncThunk(
    'organization/create',
    async (payload: OrganizationThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IOrganization>('/organization', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /organization/:id
 * body: { }
 */
export const updateOrganization = createAsyncThunk(
    'organization/update',
    async (payload: OrganizationThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IOrganization>(`/organization/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /organization/:id
 * body: { }
 */
export const deleteOrganization = createAsyncThunk(
    "organization/delete",
    async (payload: OrganizationThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/organization/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /organization/:id
 * body: { }
 */
export const getOrganizationById = createAsyncThunk(
    "organization/getOrganizationById",
    async (payload: OrganizationThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/organization/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /organization?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllOrganization = createAsyncThunk(
    "organization/getAllOrganization",
    async (payload:OrganizationThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/organization`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
/*
 * GET @ /organization?name=org-name-str&page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllOrganizationByName = createAsyncThunk(
    "organization/getAllOrganizationByName",
    async (payload:OrganizationThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                name:payload.searchQuery,
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/organization/search`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
