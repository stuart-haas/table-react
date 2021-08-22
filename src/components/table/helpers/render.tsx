import React from "react";
import { TableColumnProps, TableHeaderCellsProps } from "../contracts";
import { getAttributes, getRowActionsLabel } from "./functions";
import TableHeaderCell from "../TableHeaderCell";
import TableRow, { TableRowProps } from "../TableRow";
import TableDataCell from "../TableDataCell";
import TableRowAction, { TableRowActionProps } from "../TableRowAction";

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

export function HeaderActionCell(props: TableHeaderCellsProps) {
  return (
    props.rows?.actions && (
      <th {...getAttributes(props.rows?.actions?.attributes)}>
        {getRowActionsLabel(props)}
      </th>
    )
  );
}

export function Rows(props: TableRowProps) {
  return props.data?.map((data: TableRowProps, index: number) => (
    <TableRow
      key={index}
      index={index}
      columns={props.columns}
      data={data}
      attributes={props.rows?.attributes}
      actions={props.rows?.actions}
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

export function RowActions(props: TableRowProps) {
  return (
    props.actions &&
    props.actions.items.map((action: TableRowActionProps, index: number) => {
      const actionProps = {
        ...action,
        index: props.index,
        data: props.data,
        columns: props.columns,
      };
      return <TableRowAction key={index} {...actionProps} />;
    })
  );
}
