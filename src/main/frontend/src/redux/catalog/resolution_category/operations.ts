import {IResolutionCategory} from "../../../models/catalog/IResolutionCategory";
import {SortOrder} from "../../../models/IPageable";

interface ResolutionCategoryThunkPayload {
    id?: number;
    dto?: IResolutionCategory;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}
