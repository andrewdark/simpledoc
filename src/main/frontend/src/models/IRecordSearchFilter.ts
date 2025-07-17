import {IRecordGroup, RecordGroupType} from "./catalog/IRecordGroup";

export interface IRecordSearchFilter {
    recordGroupType?: typeof RecordGroupType[keyof typeof RecordGroupType] | null;
    recordIdSet?: number[] | null;
    regDateFrom?: Date | null;
    regDateTo?: Date | null;
    recordGroupName?: string | null;
    orderNum?: number | null;
    regNum?: string | null;

    withRecordGroup?: boolean | null;
};
