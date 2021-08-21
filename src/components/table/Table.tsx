import React from 'react';
import { TableBodyProps, TableColumnProps, TableHeaderProps, TableHeaderRowProps } from './contracts';
import { TableAttributes } from './contracts/TableColumnProps';
import { getAttributes } from './functions';
import TableHeaderCell from './TableHeaderCell';
import TableRow, { TableRowProps } from './TableRow';

interface DefaultTableProps {
    header?: TableHeaderProps;
    headerRow?: TableHeaderRowProps;
    body?: TableBodyProps;
    columns: Array<TableColumnProps>;
    rows?: TableRowProps;
    data?: Array<any>;
}

export type TableProps = DefaultTableProps & TableAttributes;

const Table = (props: TableProps) => {
    return (
        <table {...getAttributes(props.attributes)}>
            <thead {...getAttributes(props.header?.attributes)}>
                <tr {...getAttributes(props.headerRow?.attributes)}>
                    {props.columns.map((column: TableColumnProps, index: number) => (
                        <TableHeaderCell key={index} {...column} />
                    ))}
                </tr>
            </thead>
            <tbody {...getAttributes(props.body?.attributes)}>
                {props.data?.map((data: any, index: number) => (
                    <TableRow key={index} index={index} columns={props.columns} data={data} attributes={props.rows?.attributes} />
                ))}
            </tbody>
        </table>
    );
}

export default Table;