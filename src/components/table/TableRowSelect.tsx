import React, { useContext } from "react";
import CheckboxSelectContext from "./context/CheckboxSelectContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import SelectedContext from "./context/SelectedContext";

export interface TableRowSelectProps {
  data?: any;
}

const TableRowSelect = (props: TableRowSelectProps) => {
  const selected = useContext(SelectedContext);
  const primaryKey = useContext(PrimaryKeyContext);
  const checkboxSelect = useContext(CheckboxSelectContext);
  const { data } = props;
  return (
    <td>
      <input
        type="checkbox"
        checked={
          selected.find((item: any) => item === data[primaryKey!]) || false
        }
        onChange={(e: any) =>
          checkboxSelect(e, data[primaryKey!])
        }
      />
    </td>
  );
};

export default TableRowSelect;
