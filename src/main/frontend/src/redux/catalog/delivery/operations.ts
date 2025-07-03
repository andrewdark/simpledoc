import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {IDelivery} from "../../../models/catalog/IDelivery";
import {SortOrder} from "../../../models/IPageable";

interface DeliveryThunkPayload {
    id?: number;
    dto?: IDelivery;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}

/*
 * POST @ /delivery
 * body: { }
 */
export const createDelivery = createAsyncThunk(
    'delivery/create',
    async (payload: DeliveryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.post<IDelivery>('/delivery', payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * PUT @ /delivery/:id
 * body: { }
 */
export const updateDelivery = createAsyncThunk(
    'delivery/update',
    async (payload: DeliveryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.put<IDelivery>(`/delivery/${payload.id}`,  payload.dto);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * DELETE @ /delivery/:id
 * body: { }
 */
export const deleteDelivery = createAsyncThunk(
    "delivery/delete",
    async (payload: DeliveryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.delete(`/delivery/${payload.id}`);
            return payload.id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /delivery/:id
 * body: { }
 */
export const getDeliveryById = createAsyncThunk(
    "delivery/getDeliveryById",
    async (payload: DeliveryThunkPayload, thunkAPI) => {
        try {
            const res = await $api.get(`/delivery/${payload.id}`);
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);

/*
 * GET @ /delivery?page=0&size=10&sort=id&order=ASC
 * body: { }
 */
export const getAllDelivery = createAsyncThunk(
    "delivery/getAllDelivery",
    async (payload:DeliveryThunkPayload, thunkAPI) => {
        try {
            const params: { [key: string]: any } = {
                number: payload.number,
                size: payload.size,
                sort:payload.sort,
                order:payload.order
            };
            const res = await $api.get(`/delivery`, {
                params: params,
            });
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.data.message);
        }
    }
);
