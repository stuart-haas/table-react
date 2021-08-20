import React from 'react';
import { TableColumnProps, TableHeaderProps } from './contracts';
import TableHeaderCell from './TableHeaderCell';
import TableRow, { TableRowProps } from './TableRow';

export interface TableProps {
    className?: string;
    style?: object;
    attributes?: object;
    header: TableHeaderProps;
    columns: Array<TableColumnProps>;
    data?: Array<any>;
}

const Table = (props: TableProps) => {
    return (
        <table className={props.className} style={props.style} {...props.attributes}>
            <thead>
                <tr>
                    {props.columns.map((e: TableColumnProps, index: number) => (
                        <TableHeaderCell key={index} { ...e } />
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data?.map((e: TableRowProps, index: number) => (
                    <TableRow key={index} index={index} columns={props.columns} data={props.data} />
                ))}
            </tbody>
        </table>
    );
}

export default Table;