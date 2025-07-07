import {ICitizenStatus} from "./ICitizenStatus";
import {ICitizenCategory} from "./ICitizenCategory";

export interface ICitizen {
    id?: number;
    fullName: string;
    address: string;
    deleted: boolean;
    status?: ICitizenStatus | null;
    category?: ICitizenCategory | null;
    createdAt?: string;
    updatedAt?: string;
}
