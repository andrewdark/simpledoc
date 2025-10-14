import {IDepartment} from "./catalog/IDepartment";
import {IRecord} from "./IRecord";

export const PublisherType = {
    SIGNATORY: "SIGNATORY", APPROVER: "APPROVER", EXECUTANT: "EXECUTANT"
} as const;

export interface IPublisher {
    id: number | null;
    record?: IRecord;
    official: IDepartment | null;
    signingDate: Date | null;
    publisherType: typeof PublisherType[keyof typeof PublisherType];
    note?: string | null;
    createdAt?: string;
    updatedAt?: string;
}
