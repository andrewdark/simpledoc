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
}
