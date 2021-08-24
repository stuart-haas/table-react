import React, { useContext } from "react";
import OrderContext from "./context/OrderContext";
import TableColumnProps from "./contracts/TableColumnProps";
import {
  getAttributes,
  getColumnAttributes,
  getColumnLabel,
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
  const { sortable } = props;
  const [sort, order, setOrder] = useContext(OrderContext);
  const attributes = {
    ...getColumnAttributes(props),
    ...getAttributes(props.attributes),
  };
  return (
    <th {...attributes} onClick={() => sortable && setOrder(props)}>
      {getColumnLabel(props, sort, order)}
    </th>
  );
};

TableHeaderCell.defaultProps = {
  sortable: true,
};

export default TableHeaderCell;
