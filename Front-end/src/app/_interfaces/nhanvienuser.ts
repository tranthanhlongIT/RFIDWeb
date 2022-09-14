import { SortDirection } from './utils';

export interface nhanvien {
    ID: number;
    UserName: string;
    MaNhanVien: string;
    HoTen: string;
    Ho: string;
    Ten: string;
    GioiTinh: number;
    NgaySinh: Date;
    Email: string;
    DienThoai: string;
    DiaChi: string;
    ChucVuID: number;
    PhongBanID: number;
    LinkHinhAnh: string;
    NguoiTao: string;
    NgayTao: Date;
    NguoiCapNhat: string;
    NgayCapNhat: Date;
    ListQuyen?:string;
    ListNhom?:string;
    IsSelected: boolean;
    TenPhongBan:string;
    TenChucVu: string;
    Key: string,
    Password: string,
    ConfirmPassword: string
}

export type nhanvienColumns = keyof nhanvien | '';

export interface nhanvienSortEvent {
    column: nhanvienColumns;
    direction: SortDirection;
}
