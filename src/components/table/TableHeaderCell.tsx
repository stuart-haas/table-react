import React from 'react';
import { TableColumnProps } from './contracts';

const TableHeaderCell = (props: TableColumnProps) => {
    return (
        <th>
            {props.label}
        </th>
    );
};

export default TableHeaderCell;