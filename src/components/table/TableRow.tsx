import React from "react";
import TableColumnModel, {
  AttributesCallback,
} from "./models/TableColumnModel";
import { getRowAttributes } from "./helpers/functions";
import TableDataCell from "./TableDataCell";
import TableRowSelect from "./TableRowSelect";

export interface TableRowModel {
  index?: number;
  columns?: Array<TableColumnModel>;
  data?: any;
  attributes?: object | AttributesCallback;
  rows?: TableRowModel;
}

const TableRow = (model: TableRowModel) => {
  return (
    <tr {...getRowAttributes(model)}>
      <TableRowSelect data={model.data} />
      {model.columns &&
        model.columns.map((column: TableColumnModel, index: number) => {
          const cellModel = { row: model, column };
          return <TableDataCell key={index} {...cellModel} />;
        })}
    </tr>
  );
};

export default TableRow;
