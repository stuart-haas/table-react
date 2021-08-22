import React from "react";
import { TableColumnProps, TableHeaderCellsProps } from "./contracts";
import {
  getHeaderCellAttributes,
  getHeaderCellLabel,
} from "./helpers/functions";

export type TableHeaderCellProps = TableColumnProps & TableHeaderCellsProps;

const TableHeaderCell = (props: TableHeaderCellProps) => {
  return (
    <th {...getHeaderCellAttributes(props)}>{getHeaderCellLabel(props)}</th>
  );
};

export default TableHeaderCell;
