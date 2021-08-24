import React, { useContext } from "react";
import OrderContext from "./context/OrderContext";
import TableColumnProps from "./contracts/TableColumnProps";
import {
  getAttributes,
  getHeaderCellAttributes,
  getHeaderCellLabel,
} from "./helpers/functions";
import { TableRowProps } from "./TableRow";

interface DefaultTableHeaderCellProps {
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
}

export type TableHeaderCellProps = DefaultTableHeaderCellProps &
  TableColumnProps;

const TableHeaderCell = (props: TableHeaderCellProps) => {
  const order = useContext(OrderContext);
  const attributes = {
    ...getHeaderCellAttributes(props),
    ...getAttributes(props.attributes),
  };
  return <th {...attributes} onClick={() => order(props)}>{getHeaderCellLabel(props)}</th>;
};

export default TableHeaderCell;
