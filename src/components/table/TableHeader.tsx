import React, { Fragment } from "react";
import TableColumnProps from "./contracts/TableColumnProps";
import { getAttributes, getHeaderCellAttributes, getHeaderCellLabel } from "./helpers/functions";
import { TableRowProps } from "./TableRow";

export interface TableHeaderProps {
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
}

const TableHeader = (props: TableHeaderProps) => {
  return (
    <Fragment>
      {props.columns &&
        props.columns.map((column: TableColumnProps, index: number) => {
          const cellProps = {
            ...column,
            columns: props.columns,
            rows: props.rows,
            data: props.data,
          };
          const attributes = {...getHeaderCellAttributes(cellProps), ...getAttributes(cellProps.attributes)}
          return <th key={index} {...attributes}>{getHeaderCellLabel(cellProps)}</th>
        })}
    </Fragment>
  );
};

export default TableHeader;
