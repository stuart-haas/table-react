import React from 'react';
import { TableColumnProps, TableHeaderProps } from './contracts';
import { TableAttributes } from './contracts/TableColumnProps';
import { getAttributes } from './functions';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';

interface DefaultTableProps {
    header?: TableHeaderProps;
    columns: Array<TableColumnProps>;
    data?: Array<any>;
}

export type TableProps = DefaultTableProps & TableAttributes;

const Table = (props: TableProps) => {
    return (
        <table {...getAttributes(props.attributes)}>
            <thead>
                <tr>
                    {props.columns.map((props: TableColumnProps, index: number) => (
                        <TableHeaderCell key={index} { ...props } />
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data?.map((data: any, index: number) => (
                    <TableRow key={index} index={index} columns={props.columns} data={data} />
                ))}
            </tbody>
        </table>
    );
}

export default Table;