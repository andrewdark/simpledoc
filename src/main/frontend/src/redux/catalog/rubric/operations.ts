import {IRubric} from "../../../models/catalog/IRubric";
import {SortOrder} from "../../../models/IPageable";

interface RubricThunkPayload {
    id?: number;
    dto?: IRubric;
    number?: number;
    size?: number;
    sort?:string;
    order?:SortOrder;
}
