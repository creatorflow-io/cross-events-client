
export interface TableQueryResult<TModel>{
    Page: number;
    PageSize: number;
    Data: TModel[];
    Count: number;
}