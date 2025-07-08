export interface IRubric {
    "id"?: number | null;
    code?:string;
    name:string;
    node: boolean;
    parent?:IRubric | null;
    children?:IRubric[];
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
