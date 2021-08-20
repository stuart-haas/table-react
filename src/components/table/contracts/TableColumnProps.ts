export interface TransformCallback {
    (data: any, value: any, index: number): any;
}

export interface ValueCallback {
    (data: any, index: number): any;
}

export interface ClassCallback {
    (data: any, value: any, index: number): any;
}

export interface StyleCallback {
    (data: any, value: any, index: number): any;
}

export interface AttributesCallback {
    (data: any, value: any, index: number): any;
}

export default interface TableColumnProps {
    label: string;
    property?: string;
    transform?: TransformCallback;
    value?: string|number|ValueCallback;
    style?: object|StyleCallback;
    className?: string|ClassCallback;
    attributes?: object|AttributesCallback;
}