export interface IRubric {
    "id"?: number;
    code?:string;
    name:string;
    node: boolean;
    parent?:IRubric | null;
    children?:IRubric[];
    deleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}
