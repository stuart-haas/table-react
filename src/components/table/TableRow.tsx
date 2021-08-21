import React from 'react';
import { TableDataCell } from '.';
import { TableColumnProps } from './contracts';

export interface TableRowProps {
    index: number;
    columns: Array<TableColumnProps>;
    data?: any;
}

const TableRow = (props: TableRowProps) => {
    return (
        <tr>
            {props.columns.map((column: TableColumnProps, index: number ) => (
                <TableDataCell key={index} row={props} column={column} />
            ))}
        </tr>
    )

    
};

export default TableRow;