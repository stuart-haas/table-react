import React from 'react';
import { TableColumnProps } from './contracts';
import { TableRowProps } from './TableRow';
import { getDataCellAttributes, getValueByProperty } from './helpers/functions';

export interface TableDataCellProps {
    row: TableRowProps;
    column: TableColumnProps;
};

const TableDataCell = (props: TableDataCellProps) => {
    const { row, column } = props;
    return (
        <td {...getDataCellAttributes(row, column)}
        >
            {getValueByProperty(row, column)}
        </td>
    )
};

export default TableDataCell;