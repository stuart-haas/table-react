import React from 'react';
import { TableDataCell } from '.';
import { TableColumnProps } from './contracts';
import { AttributesCallback } from './contracts/TableColumnProps';
import { getRowAttributes } from './functions';

export interface TableRowProps {
    index?: number;
    columns?: Array<TableColumnProps>;
    data?: any;
    attributes?: object|AttributesCallback;
}

const TableRow = (props: TableRowProps) => {
    return (
        <tr {...getRowAttributes(props)}>
            {props.columns && props.columns.map((column: TableColumnProps, index: number ) => (
                <TableDataCell key={index} row={props} column={column} />
            ))}
        </tr>
    )
};

export default TableRow;