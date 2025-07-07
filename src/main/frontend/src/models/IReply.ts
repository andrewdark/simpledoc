import Resolution from "../pages/ResolutionPage/Resolution/Resolution";
import {IResolution} from "./IResolution";
import {IDepartment} from "./catalog/IDepartment";

export const ReplyType = {
    FULL_REPLY: "full_reply",
    PARTIAL_REPLY: "partial_reply"
} as const;

export interface IReply {
    id?: number;
    resolution?: IResolution | null;
    replyDate: string;
    replyType: typeof ReplyType[ keyof typeof ReplyType];
    executor?: IDepartment | null;
    content: string;
    createdAt: string;
    updatedAt: string;
}
