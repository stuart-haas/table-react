import React from "react";
import { useOrderContext } from "./context/OrderContext";
import TableColumnModel from "./models/TableColumnModel";
import {
  getAttributes,
  getColumnAttributes,
  getColumnLabel,
} from "./helpers/functions";
import { TableRowModel } from "./TableRow";

interface DefaultTableHeaderCellModel {
  columns: Array<TableColumnModel>;
  rows?: TableRowModel;
  data?: Array<any>;
}

export type TableHeaderCellModel = DefaultTableHeaderCellModel &
  TableColumnModel;

const TableHeaderCell = (model: TableHeaderCellModel) => {
  const { sortable } = model;
  const {sort, order, handleSetOrder} = useOrderContext();
  const attributes = {
    ...getColumnAttributes(model),
    ...getAttributes(model.attributes),
  };
  return (
    <th {...attributes} onClick={() => sortable && handleSetOrder && handleSetOrder(model)}>
      {getColumnLabel(model, sort, order)}
    </th>
  );
};

TableHeaderCell.defaultProps = {
  sortable: true,
};

export default TableHeaderCell;
