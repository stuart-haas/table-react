import React, { ChangeEvent } from "react";
import { useRowCheckboxContext } from "./context/RowCheckboxContext";
import { usePrimaryKeyContext } from "./context/PrimaryKeyContext";
import { useSelectedContext } from "./context/SelectedContext";

export interface TableRowSelectProps {
  data?: any;
}

const TableRowSelect = (props: TableRowSelectProps) => {
  const selected = useSelectedContext();
  const { primaryKey } = usePrimaryKeyContext();
  const { handleRowCheckbox } = useRowCheckboxContext();
  const { data } = props;
  return (
    <td>
      <input
        type="checkbox"
        checked={
          selected.find((item: any) => item === data[primaryKey!]) || false
        }
        onChange={(event: ChangeEvent<HTMLInputElement>|undefined) => handleRowCheckbox && handleRowCheckbox({ event, key: data[primaryKey!] })}
      />
    </td>
  );
};

export default TableRowSelect;
