import React from 'react';
import { AttributesCallback } from './contracts/TableColumnProps';
import { TableColumnProps } from './contracts';
import { getRowActionAttributes } from './functions';

export interface TableRowActionProps {
    index?: number;
    label?: string;
    attributes?: object|AttributesCallback;
    columns?: Array<TableColumnProps>;
    data?: any;
    tag?: string;
}

export interface TableRowActionsProps {
    label: string;
    attributes?: object|AttributesCallback;
    items: Array<TableRowActionProps>;
}

const TableRowAction = (props: TableRowActionProps) => {
    const Tag = `${props.tag}` as keyof JSX.IntrinsicElements;
    return (
        <Tag {...getRowActionAttributes(props)}>{props.label}</Tag>
    );
}

TableRowAction.defaultProps = {
    tag: 'span',
}

export default TableRowAction;