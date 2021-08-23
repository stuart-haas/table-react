import React from "react";
import { TableRowProps } from "./TableRow";
import { getAttributes, getDataCellAttributes, render } from "./helpers/functions";
import TableColumnProps from "./contracts/TableColumnProps";

export interface TableDataCellProps {
  row: TableRowProps;
  column: TableColumnProps;
}

const TableDataCell = (props: TableDataCellProps) => {
  const { row, column } = props;
  const attributes = {...getDataCellAttributes(row, column), ...getAttributes(column.attributes)}
  return (
    <td {...attributes}>
      {render(row, column)}
    </td>
  );
};

export default TableDataCell;
