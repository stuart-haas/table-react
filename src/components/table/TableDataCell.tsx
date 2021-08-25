import React from "react";
import { TableRowModel } from "./TableRow";
import { getAttributes, getDataAttributes, render } from "./helpers/functions";
import TableColumnModel from "./models/TableColumnModel";

export interface TableDataCellModel {
  row: TableRowModel;
  column: TableColumnModel;
}

const TableDataCell = (model: TableDataCellModel) => {
  const { row, column } = model;
  const attributes = {...getDataAttributes(row, column), ...getAttributes(column.attributes)}
  return (
    <td {...attributes}>
      {render(row, column)}
    </td>
  );
};

export default TableDataCell;
