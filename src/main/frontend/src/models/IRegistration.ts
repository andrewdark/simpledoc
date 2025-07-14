import {IRecordGroup} from "./catalog/IRecordGroup";
import {IDelivery} from "./catalog/IDelivery";
import {IResolution} from "./IResolution";
import {IFileLink} from "./IFileLink";
import {IRubric} from "./catalog/IRubric";
import {ICorrespondent} from "./ICorrespondent";

export interface IRegistration {
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
    correspondent?: ICorrespondent | null;
    delivery?:IDelivery;
    resolutions?: IResolution[];
    files?: IFileLink[];
    rubrics?: IRubric[];
    // links: ILinkRecord[];
}
