import { TableRowProps } from "../TableRow";

export interface ITableData {};

export interface TableData extends ITableData {
    data: any;
    value: any;
    index?: number;
    columns?: Array<TableColumnProps>;
};

export interface TableLabelData extends ITableData {
    type?: string;
    property?: string;
    columns?: Array<TableColumnProps>;
    rows?: TableRowProps;
    data?: any;
    index?: number;
    attributes?: object|AttributesCallback;
    tag?: string;
};

export interface TransformCallback {
    (callback: TableData): any;
}

export interface ValueCallback {
    (callback: TableData): any;
}
export interface AttributesCallback {
    (callback: ITableData): any;
}

export interface LabelCallback {
    (callback: TableLabelData): any;
}
export interface TableAttributes {
    attributes?: object|AttributesCallback;
}
interface DefaultTableColumnProps {
    type?: string;
    property?: string;
    label?: string|LabelCallback;
    transform?: TransformCallback;
    value?: string|number|ValueCallback;
    dataAttributes?: object|AttributesCallback;
    columnAttributes?: object|AttributesCallback;
}

type TableColumnProps = DefaultTableColumnProps & TableAttributes;

export default TableColumnProps;