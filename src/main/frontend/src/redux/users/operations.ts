import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../http";
import {IUser} from "../../models/IUser";
import {IPageable} from "../../models/IPageable";

//?page=0&size=5&sort=email,asc
export const fetchUsers = createAsyncThunk("users/fetchUsers",  async (_, thunkAPI) => {
    try {
        const res = await $api.get<IPageable<IUser>>("/user");
        return res.data;
    } catch (error : any) {
        //{error.message, error.code}
        return thunkAPI.rejectWithValue(error.message);
    }
});
