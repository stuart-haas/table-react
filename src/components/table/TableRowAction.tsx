import React from 'react';
import { AttributesCallback, LabelCallback } from './contracts/TableColumnProps';
import { TableColumnProps } from './contracts';
import { getRowActionAttributes, getRowActionLabel } from './helpers/functions';

export interface TableRowActionsProps {
    label: string|LabelCallback;
    attributes?: object|AttributesCallback;
    items: Array<TableRowActionProps>;
}

export interface TableRowActionProps {
    index?: number;
    label?: string|LabelCallback;
    attributes?: object|AttributesCallback;
    columns?: Array<TableColumnProps>;
    data?: any;
    tag?: string;
}

const TableRowAction = (props: TableRowActionProps) => {
    const Tag = `${props.tag}` as keyof JSX.IntrinsicElements;
    return (
        <Tag {...getRowActionAttributes(props)}>{getRowActionLabel(props)}</Tag>
    );
}

TableRowAction.defaultProps = {
    tag: 'span',
}

export default TableRowAction;