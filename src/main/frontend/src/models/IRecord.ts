import {IRecordGroup} from "./catalog/IRecordGroup";
import {ICorrespondent} from "./ICorrespondent";
import {IDelivery} from "./catalog/IDelivery";
import {IResolution} from "./IResolution";
import {IFileLink} from "./IFileLink";
import {IRubric} from "./catalog/IRubric";

export interface IRecord {
    id: number | null;
    orderNum: number | null;
    regNum: string;
    regDate: Date;
    consist?: string;
    content: string;
    note?: string;
    collective?: boolean;
    signCount?: number;

    recordGroup:IRecordGroup | null;
    correspondents?: ICorrespondent[];
    delivery?:IDelivery;
    resolutions?: IResolution[];
    files?: IFileLink[];
    rubrics?: IRubric[];
    // links: ILinkRecord[];

    createdAt?: string;
    updatedAt?: string;
}
