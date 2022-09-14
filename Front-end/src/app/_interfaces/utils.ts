export type SortDirection = 'asc' | 'desc' | '';

export interface Reports {
    ID: number;
    MaBaoCao: string;
    TenBaoCao: string;
    MoTa: string;
    LstParameters: string;
    NguoiTao: string;
    NgayTao: Date;
    NguoiCapNhat: string;
    NgayCapNhat: Date;
    IsSelected: boolean;
}
export interface ReportsPara {
    ID?: number;
    Name?: string;
    Type?: string;
    ParaName?: string;
    ParaValue?: any;
    ParaValueDate?: Date;
    DataSource?: string;
    IsSelected?: boolean;
}
export interface ReportsView {
    code: string;
    pars: ReportsPara[];
}
export class UploadFile {
    ID?: string;
    FileName?: string;
    File?: File;
    IsDelete?: boolean = false;
}
