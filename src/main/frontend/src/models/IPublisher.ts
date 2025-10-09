import {IDepartment} from "./catalog/IDepartment";

export const VisaType = {
    SIGNATORY: "SIGNATORY", APPROVER: "APPROVER", EXECUTANT: "EXECUTANT"
} as const;

export interface IPublisher {
    id: number | null;
    department: IDepartment | null;
    signingDate: Date | null;
    visaType: typeof VisaType[keyof typeof VisaType];
    createdAt?: string;
    updatedAt?: string;
}
