import React, { useContext } from "react";
import TableHeaderCell, { TableHeaderCellProps } from "../TableHeaderCell";
import TableRow, { TableRowProps } from "../TableRow";
import TableDataCell from "../TableDataCell";
import TableCheckbox from "components/table/TableCheckbox";
import SelectedContext from "components/table/context/SelectedContext";
import PrimaryKeyContext from "../context/PrimaryKeyContext";
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

interface BatchRowSelectProps {
  ref: any;
  data?: any;
  batchSelectChange: (e: any, data?: any) => void;
}

export function BatchRowSelect(props: BatchRowSelectProps) {
  const { ref, batchSelectChange, data } = props;
  return (
    <td>
      <PrimaryKeyContext.Consumer>
        {(value) => (
          <TableCheckbox
            ref={ref}
            onChange={(e: any) => {
              const mappedData = data.map((item: any) => item[value!]);
              batchSelectChange(e, mappedData);
            }}
          />
        )}
      </PrimaryKeyContext.Consumer>
    </td>
  );
}

interface RowSelectProps {
  data?: any;
  selectChange?: (e: any, data?: any) => void;
}

export function RowSelect(props: RowSelectProps) {
  const selected = useContext(SelectedContext);
  const { data, selectChange } = props;
  return (
    <td>
      <PrimaryKeyContext.Consumer>
        {(value) => (
          <TableCheckbox
            checked={
              selected.find((item: any) => item === data[value!]) || false
            }
            onChange={(e: any) => selectChange && selectChange(e, data[value!])}
          />
        )}
      </PrimaryKeyContext.Consumer>
    </td>
  );
}
