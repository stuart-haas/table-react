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
  selectChange?: (e: any, data?: any) => void;
}

const TableRow = (props: TableRowProps) => {
  return (
    <tr {...getRowAttributes(props)}>
      {Render.RowSelect({ data: props.data, selectChange: props.selectChange })}
      {Render.DataCells(props)}
    </tr>
  );
};

export default TableRow;
