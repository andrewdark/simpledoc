import {IOrganization} from "./catalog/IOrganization";
import {ICitizen} from "./catalog/ICitizen";

export const CorrespondentType = {
    INCOMING_ORGANIZATION: "Вхідний від організації",
    INCOMING_CITIZEN: "Вхідний від громадянина",
    COVER_LETTER: "Супровідний лист",
    OUTGOING_ORGANIZATION: "Вихідний до організації",
    OUTGOING_CITIZEN: "Вхідний до громадянина"
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
