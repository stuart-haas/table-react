import React, { useContext } from "react";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import SelectedContext from "./context/SelectedContext";
import TableCheckbox from "./TableCheckbox";

export interface TableRowSelectProps {
  data?: any;
  selectChange?: (e: any, data?: any) => void;
}

const TableRowSelect = (props: TableRowSelectProps) => {
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
};

export default TableRowSelect;