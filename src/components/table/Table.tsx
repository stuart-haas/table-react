import React from "react";
import {
  TableBodyProps,
  TableColumnProps,
  TableHeaderProps,
} from "./contracts";
import { TableAttributes } from "./contracts/TableColumnProps";
import { getAttributes } from "./helpers/functions";
import * as Render from "./helpers/render";
import { TableRowProps } from "./TableRow";

interface DefaultTableProps {
  header?: TableHeaderProps;
  body?: TableBodyProps;
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
}

export type TableProps = DefaultTableProps & TableAttributes;

const Table = (props: TableProps) => {
  return (
    <table {...getAttributes(props.attributes)}>
      <thead {...getAttributes(props.header?.attributes)}>
        <tr {...getAttributes(props.header?.row?.attributes)}>
          {Render.HeaderCells(props)}
          {Render.HeaderActionCell(props)}
        </tr>
      </thead>
      <tbody {...getAttributes(props.body?.attributes)}>
        {Render.Rows(props)}
      </tbody>
    </table>
  );
};

export default Table;
