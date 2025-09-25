import {IRecordGroup} from "./catalog/IRecordGroup";
import {ICorrespondent} from "./ICorrespondent";
import {IDelivery} from "./catalog/IDelivery";
import {IResolution} from "./IResolution";
import {IFileLink} from "./IFileLink";
import {IRubric} from "./catalog/IRubric";

export interface IRecord {
    id: number | null;
    orderNum: number | null;
    regNum: string | null;
    regDate: Date | null;
    consist?: string | null;
    recipient?: string | null; //TODO: ADD to other parts
    content: string | null;
    note?: string | null;
    collective?: boolean | null;
    signCount?: number | null;

    recordGroup:IRecordGroup | null;
    correspondents?: ICorrespondent[] | null;
    delivery?:IDelivery | null;
    resolutions?: IResolution[] | null;
    files?: IFileLink[] | null;
    rubrics?: IRubric[] | null;
    // links: ILinkRecord[];

    createdAt?: string;
    updatedAt?: string;
}
