import React from "react";
import TableColumnProps, {
  AttributesCallback,
} from "./contracts/TableColumnProps";
import { getRowAttributes } from "./helpers/functions";
import TableDataCell from "./TableDataCell";
import TableRowSelect from "./TableRowSelect";

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
      <TableRowSelect data={props.data} />
      {props.columns &&
        props.columns.map((column: TableColumnProps, index: number) => {
          const cellProps = { row: props, column };
          return <TableDataCell key={index} {...cellProps} />;
        })}
    </tr>
  );
};

export default TableRow;
