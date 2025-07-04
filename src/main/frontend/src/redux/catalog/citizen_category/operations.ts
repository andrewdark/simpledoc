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
