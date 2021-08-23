import React from "react";
import { TableRowProps } from "./TableRow";
import { getDataCellAttributes, render } from "./helpers/functions";
import TableColumnProps from "./contracts/TableColumnProps";

export interface TableDataCellProps {
  row: TableRowProps;
  column: TableColumnProps;
}

const TableDataCell = (props: TableDataCellProps) => {
  const { row, column } = props;
  return (
    <td {...getDataCellAttributes(row, column)}>
      {render(row, column)}
    </td>
  );
};

export default TableDataCell;
