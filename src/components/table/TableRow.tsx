import React from "react";
import { TableColumnProps } from "./contracts";
import { AttributesCallback } from "./contracts/TableColumnProps";
import { getAttributes, getRowAttributes } from "./helpers/functions";
import { TableRowActionsProps } from "./TableRowAction";
import * as Render from "./helpers/render";

export interface TableRowProps {
  index?: number;
  columns?: Array<TableColumnProps>;
  data?: any;
  attributes?: object | AttributesCallback;
  actions?: TableRowActionsProps;
  rows?: TableRowProps;
}

const TableRow = (props: TableRowProps) => {
  return (
    <tr {...getRowAttributes(props)}>
      {Render.DataCells(props)}
      {props.actions && (
        <td {...getAttributes(props.actions?.attributes)}>
          {Render.RowActions(props)}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
