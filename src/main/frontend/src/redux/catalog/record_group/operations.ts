import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../http";
import {IRecordGroup} from "../../../models/catalog/IRecordGroup";
import {SortOrder} from "../../../models/IPageable";

interface RecordGroupThunkPayload {
    id?: number;
    dto?: IRecordGroup;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}
