import React, { useContext } from "react";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import SelectedContext from "./context/SelectedContext";
import TableColumnProps, {
  AttributesCallback,
} from "./contracts/TableColumnProps";
import { getRowAttributes } from "./helpers/functions";
import TableDataCell from "./TableDataCell";

export interface TableRowProps {
  index?: number;
  columns?: Array<TableColumnProps>;
  data?: any;
  attributes?: object | AttributesCallback;
  rows?: TableRowProps;
  checkboxSelection?: boolean;
  selectChange?: (e: any, data?: any) => void;
}

const TableRow = (props: TableRowProps) => {
  const primaryKey = useContext(PrimaryKeyContext);
  const selected = useContext(SelectedContext);
  const { data, selectChange } = props;
  return (
    <tr {...getRowAttributes(props)}>
      {props.checkboxSelection && (
        <td>
          <input
            type="checkbox"
            checked={
              selected.find((item: any) => item === data[primaryKey!]) || false
            }
            onChange={(e: any) =>
              selectChange && selectChange(e, props.data[primaryKey!])
            }
          />
        </td>
      )}
      {props.columns &&
        props.columns.map((column: TableColumnProps, index: number) => {
          const cellProps = { row: props, column };
          return <TableDataCell key={index} {...cellProps} />;
        })}
    </tr>
  );
};

export default TableRow;
