export interface AttributesData {};

export interface ColumnAttributesData extends AttributesData {
    data: any;
    value: any;
    index?: number;
    columns?: Array<TableColumnProps>;
};

export interface TableAttributesData extends AttributesData {};

export interface TransformCallback {
    (callback: ColumnAttributesData): any;
}

export interface ValueCallback {
    (callback: ColumnAttributesData): any;
}
export interface AttributesCallback {
    (callback: AttributesData): any;
}

export interface TableAttributes {
    attributes?: object|AttributesCallback;
}
interface DefaultTableColumnProps {
    label: string;
    property?: string;
    transform?: TransformCallback;
    value?: string|number|ValueCallback;
    dataAttributes?: object|AttributesCallback;
    columnAttributes?: object|AttributesCallback;
}

type TableColumnProps = DefaultTableColumnProps & TableAttributes;

export default TableColumnProps;