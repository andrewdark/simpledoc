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
