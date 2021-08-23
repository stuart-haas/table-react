import { Fragment } from "react";
import TableColumnProps from "./contracts/TableColumnProps";
import TableDataCell from "./TableDataCell";
import { TableRowProps } from "./TableRow";

const TableDataCells = (props: TableRowProps) => {
  return (
    <Fragment>
      {props.columns &&
        props.columns.map((column: TableColumnProps, index: number) => {
          const cellProps = { row: props, column };
          return <TableDataCell key={index} {...cellProps} />;
        })}
    </Fragment>
  );
};

export default TableDataCells;
