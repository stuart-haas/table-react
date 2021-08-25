import { Order } from "../context/OrderContext";
import { TableRowModel } from "../TableRow";

export interface AttributesData {
    property?: string;
    data?: any;
    value?: string | number;
    index?: number;
    columns?: Array<TableColumnModel>;
 };

export interface RenderData {
    property?: string;
    data?: any;
    value?: string | number;
    index?: number;
    columns?: Array<TableColumnModel>;
};

export interface LabelData extends RenderData {
    rows?: TableRowModel;
    attributes?: object | AttributesCallback;
    tag?: string;
    sort?: any;
    order?: Order;
};

export interface RenderCallback {
    (callback: RenderData): void;
}
export interface AttributesCallback {
    (callback: AttributesData): void;
}

export interface LabelCallback {
    (callback: LabelData): void;
}

interface TableColumnModel {
    property?: string;
    label?: string | LabelCallback;
    render?: string | number | RenderCallback;
    dataAttributes?: object | AttributesCallback;
    columnAttributes?: object | AttributesCallback;
    attributes?: object | AttributesCallback;
    sortable?: boolean;
}

export default TableColumnModel;