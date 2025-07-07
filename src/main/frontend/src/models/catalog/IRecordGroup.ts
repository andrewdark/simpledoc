export const RecordGroupType = {
    NODE: "NODE",
    INCOMING: "INCOMING",
    OUTGOING: "OUTGOING",
    CITIZEN: "CITIZEN",
    INNER: "INNER"
} as const;

export interface IRecordGroup {
    id?: number;
    name: string;
    node: boolean;
    recordGroupType: typeof RecordGroupType[keyof typeof RecordGroupType];
    indexNum: string;
    templateNum: string;
    deleted: boolean;
    parent?: IRecordGroup | null;
    children?: IRecordGroup[];
    createdAt?: string;
    updatedAt?: string;
}
