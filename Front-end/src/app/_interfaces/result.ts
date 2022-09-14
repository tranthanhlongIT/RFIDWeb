export interface Result<T> {
    pkey: string,
    pvalue: string,
    pdata: T,
    pdatas: T[],
    jobject: string,
    psearch: string,
    pfilter: string,
    tdate: Date | null,
    sdate: Date | null,
    edate: Date | null,
    spage: number | null,
    ipage: number | null,
    tpage: number | null
}