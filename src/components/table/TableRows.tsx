import React from "react";
import TableRow, { TableRowProps } from "./TableRow";

const TableRows = (props: TableRowProps) => {
  return props.data?.map((data: TableRowProps, index: number) => (
    <TableRow
      key={index}
      index={index}
      columns={props.columns}
      data={data}
      attributes={props.rows?.attributes}
      selectChange={props.selectChange}
    />
  ));
};

export default TableRows;
