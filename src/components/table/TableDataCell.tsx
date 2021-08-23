import React from "react";
import { TableRowProps } from "./TableRow";
import { getDataCellAttributes, getValueByProperty } from "./helpers/functions";
import TableColumnProps from "./contracts/TableColumnProps";

export interface TableDataCellProps {
  row: TableRowProps;
  column: TableColumnProps;
}

const TableDataCell = (props: TableDataCellProps) => {
  const { row, column } = props;
  return (
    <td {...getDataCellAttributes(row, column)}>
      {getValueByProperty(row, column)}
    </td>
  );
};

export default TableDataCell;
