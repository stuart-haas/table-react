import TableHeaderCell, { TableHeaderCellProps } from "../TableHeaderCell";
import TableRow, { TableRowProps } from "../TableRow";
import TableDataCell from "../TableDataCell";
import TableColumnProps from "../contracts/TableColumnProps";

export function HeaderCells(props: TableHeaderCellProps) {
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
      selectChange={props.selectChange}
    />
  ));
}

export function DataCells(props: TableRowProps) {
  return (
    props.columns &&
    props.columns.map((column: TableColumnProps, index: number) => {
      const cellProps = { row: props, column };
      return <TableDataCell key={index} {...cellProps} />;
    })
  );
}
