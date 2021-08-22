import React from "react";
import { TableColumnProps, TableHeaderCellsProps } from "../contracts";
import TableHeaderCell from "../TableHeaderCell";
import TableRow, { TableRowProps } from "../TableRow";
import TableDataCell from "../TableDataCell";

export function HeaderCells(props: TableHeaderCellsProps) {
  return props.columns.map((column: TableColumnProps, index: number) => {
    const cellProps = {
      ...column,
      columns: props.columns,
      rows: props.rows,
      data: props.data,
    };
    return <TableHeaderCell key={index} {...cellProps} />;
  });
}

export function Rows(props: TableRowProps) {
  return props.data?.map((data: TableRowProps, index: number) => (
    <TableRow
      key={index}
      index={index}
      columns={props.columns}
      data={data}
      attributes={props.rows?.attributes}
    />
  ));
}

export function DataCells(props: TableRowProps) {
  return (
    props.columns &&
    props.columns.map((column: TableColumnProps, index: number) => (
      <TableDataCell key={index} row={props} column={column} />
    ))
  );
}
