import {IUser} from "../IUser";

export interface IDepartment {
    "id"?: number;
    name: string;
    position: string;
    official: boolean;
    deleted: boolean;
    parent?:IDepartment | null;
    children?:IDepartment[];
    appUserDTO?:IUser | null;
    createdAt?: string;
    updatedAt?: string;
}
