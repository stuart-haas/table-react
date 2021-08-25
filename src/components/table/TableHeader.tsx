import React, { Fragment } from "react";
import TableColumnModel from "./models/TableColumnModel";
import TableHeaderCell from "./TableHeaderCell";
import { TableRowModel } from "./TableRow";

export interface TableHeaderModel {
  columns: Array<TableColumnModel>;
  rows?: TableRowModel;
  data?: Array<any>;
}

const TableHeader = (model: TableHeaderModel) => {
  const { columns, rows, data } = model;
  return (
    <Fragment>
      {model.columns &&
        model.columns.map((column: TableColumnModel, index: number) => {
          const cellModel = {
            ...column,
            columns,
            rows,
            data,
          };
          return <TableHeaderCell key={index} {...cellModel} />
        })}
    </Fragment>
  );
};

export default TableHeader;
