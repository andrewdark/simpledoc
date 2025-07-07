import {IRecord} from "./IRecord";
import {IReply} from "./IReply";
import {IResolutionCategory} from "./catalog/IResolutionCategory";
import {IDepartment} from "./catalog/IDepartment";

export interface IResolution {
    id?: number;
    record?: IRecord | null;
    content: string;
    author?: IDepartment | null;
    resDate: string;
    planDate: string;
    factDate: string;
    resume: string;
    summary: string;
    resolutionCategory?: IResolutionCategory | null;
    replays: IReply[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
};
