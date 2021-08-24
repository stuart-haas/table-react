import { Order } from "../context/OrderContext";
import { TableRowProps } from "../TableRow";

export interface AttributesData {
    property?: string;
    data?: any;
    value?: string | number;
    index?: number;
    columns?: Array<TableColumnProps>;
 };

export interface RenderData {
    property?: string;
    data?: any;
    value?: string | number;
    index?: number;
    columns?: Array<TableColumnProps>;
};

export interface LabelData extends RenderData {
    rows?: TableRowProps;
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

interface TableColumnProps {
    property?: string;
    label?: string | LabelCallback;
    render?: string | number | RenderCallback;
    dataAttributes?: object | AttributesCallback;
    columnAttributes?: object | AttributesCallback;
    attributes?: object | AttributesCallback;
    sortable?: boolean;
}

export default TableColumnProps;