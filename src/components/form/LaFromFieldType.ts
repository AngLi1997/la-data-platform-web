import type { SelectOption } from "./SelectOption";

export interface LaFormFieldType {
    type: string,
    options?: SelectOption[],
    label: string,
    prop: string,
    defaultValue?: any,
    rules?: any[],
    placeholder?: string
}