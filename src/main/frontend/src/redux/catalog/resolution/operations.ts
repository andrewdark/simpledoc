import {IResolution} from "../../../models/catalog/IResolution";
import {SortOrder} from "../../../models/IPageable";

interface ResolutionThunkPayload {
    id?: number;
    dto?: IResolution;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}
