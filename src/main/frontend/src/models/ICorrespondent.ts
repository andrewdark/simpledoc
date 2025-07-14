import {IOrganization} from "./catalog/IOrganization";
import {ICitizen} from "./catalog/ICitizen";

export const CorrespondentType = {
    INCOMING_ORGANIZATION: "INCOMING_ORGANIZATION",
    INCOMING_CITIZEN: "INCOMING_CITIZEN",
    COVER_LETTER: "COVER_LETTER",
    OUTGOING_ORGANIZATION: "OUTGOING_ORGANIZATION",
    OUTGOING_CITIZEN: "OUTGOING_CITIZEN"
} as const;

export interface ICorrespondent {
    id: number | null;
    outNum?: string;
    outDate?: Date;
    note: string;
    signatory?: string;
    correspondentType: typeof CorrespondentType[keyof typeof CorrespondentType];
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;

    organization?: IOrganization | null;
    citizen?: ICitizen | null;
}
