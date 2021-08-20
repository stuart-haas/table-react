import React from 'react';
import { TableColumnProps } from './contracts';
import { getAttributes, getClassName, getStyle, getValueByProperty } from './functions';

export interface TableRowProps {
    index: number;
    columns: Array<TableColumnProps>;
    data?: any;
}

const TableRow = (props: TableRowProps) => {
    return (
        <tr>
            {props.columns.map((e: TableColumnProps, index: number ) => (
                <td key={index} 
                    style={getStyle(props, e)} 
                    className={getClassName(props, e)} 
                    {...getAttributes(props, e)}
                >
                    {getValueByProperty(props, e)}
                </td>
            ))}
        </tr>
    )

    
};

export default TableRow;