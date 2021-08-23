import React, { Fragment } from "react";
import TableColumnProps from "./contracts/TableColumnProps";
import { getHeaderCellAttributes, getHeaderCellLabel } from "./helpers/functions";
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
          return <th key={index} {...getHeaderCellAttributes(cellProps)}>{getHeaderCellLabel(cellProps)}</th>
        })}
    </Fragment>
  );
};

export default TableHeader;
