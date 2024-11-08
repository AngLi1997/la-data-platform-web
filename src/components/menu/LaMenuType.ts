export interface LaMenuType {
    id: string;
    label: string;
    icon: string;
    path?: string;
    children?: LaMenuType[];
}