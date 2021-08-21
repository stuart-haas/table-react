import React from 'react';
import { TableColumnProps } from './contracts';
import { getHeaderCellAttributes } from './functions';

const TableHeaderCell = (props: TableColumnProps) => {
    return (
        <th {...getHeaderCellAttributes(props)}>
            {props.label}
        </th>
    );
};

export default TableHeaderCell;