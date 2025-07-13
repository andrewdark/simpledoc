import {IRecordGroup} from "./catalog/IRecordGroup";
import {IDelivery} from "./catalog/IDelivery";
import {IResolution} from "./IResolution";
import {IFileLink} from "./IFileLink";
import {IRubric} from "./catalog/IRubric";

export interface IRegistration {
    id: number | null;
    orderNum: number | null;
    regNum: string;
    regDate: string;
    consist?: string;
    content: string;
    note?: string;
    collective?: boolean;
    signCount?: number;

    recordGroup:IRecordGroup | null;
    delivery?:IDelivery;
    resolutions?: IResolution[];
    files?: IFileLink[];
    rubrics?: IRubric[];
    // links: ILinkRecord[];
}
