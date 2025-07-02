export interface ISorted{
    "empty": boolean;
    "sorted": boolean;
    "unsorted": boolean;
}

export interface IPageable<T>{
    "content": T[];
    "pageable": string; //"INSTANCE"
    "totalElements": number;
    "totalPages": number;
    "last": boolean;
    "size": number;
    "number": number;
    "sort": ISorted;
    "numberOfElements": number;
    "first": boolean;
    "empty": boolean;
}

export type SortOrder = 'ASC' | 'DESC';
