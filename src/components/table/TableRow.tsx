import React from 'react';
import { TableDataCell } from '.';
import { TableColumnProps } from './contracts';
import { AttributesCallback } from './contracts/TableColumnProps';
import { getAttributes, getRowAttributes } from './functions';
import TableRowAction, { TableRowActionProps, TableRowActionsProps } from './TableRowAction';

export interface TableRowProps {
    index?: number;
    columns?: Array<TableColumnProps>;
    data?: any;
    attributes?: object|AttributesCallback;
    actions?: TableRowActionsProps;
}

const TableRow = (props: TableRowProps) => {
    return (
        <tr {...getRowAttributes(props)}>
            {props.columns && props.columns.map((column: TableColumnProps, index: number ) => (
                <TableDataCell key={index} row={props} column={column} />
            ))}
            {renderRowActions()}
        </tr>
    );

    function renderRowActions() {
        if(props.actions) {
            return (
                <td {...getAttributes(props.actions?.attributes)}>
                    {props.actions && props.actions.items.map((action: TableRowActionProps, index: number) => {
                        const actionProps = { ...action, index: props.index, data: props.data, columns: props.columns };
                        return (
                            <TableRowAction key={index} {...actionProps} />
                        );
                    })}
                </td>
            )
        }
    }
}

export default TableRow;