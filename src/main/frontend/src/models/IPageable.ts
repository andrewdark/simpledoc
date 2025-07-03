export interface ISorted{
    "empty": boolean;
    "sorted": boolean;
    "unsorted": boolean;
}

export interface IPage {
    "size": number,
    "number": number,
    "totalElements": number,
    "totalPages": number
}

export interface IPageable<T>{
    "content": T[];
    "page": IPage;
}

export type SortOrder = 'ASC' | 'DESC';
