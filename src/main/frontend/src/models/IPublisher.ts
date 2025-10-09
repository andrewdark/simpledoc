import {IDepartment} from "./catalog/IDepartment";

export const PublisherType = {
    SIGNATORY: "SIGNATORY", APPROVER: "APPROVER", EXECUTANT: "EXECUTANT"
} as const;

export interface IPublisher {
    id: number | null;
    department: IDepartment | null;
    signingDate: Date | null;
    publisherType: typeof PublisherType[keyof typeof PublisherType];
    createdAt?: string;
    updatedAt?: string;
}
