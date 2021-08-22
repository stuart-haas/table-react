import React from "react";
import { TableColumnProps } from "./contracts";
import { AttributesCallback } from "./contracts/TableColumnProps";
import { getRowAttributes } from "./helpers/functions";
import * as Render from "./helpers/render";

export interface TableRowProps {
  index?: number;
  columns?: Array<TableColumnProps>;
  data?: any;
  attributes?: object | AttributesCallback;
  rows?: TableRowProps;
}

const TableRow = (props: TableRowProps) => {
  return (
    <tr {...getRowAttributes(props)}>
      {Render.DataCells(props)}
    </tr>
  );
};

export default TableRow;
