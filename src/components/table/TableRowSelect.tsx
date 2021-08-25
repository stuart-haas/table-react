import React, { ChangeEvent } from "react";
import { useRowCheckboxContext } from "./context/RowCheckboxContext";
import { usePrimaryKeyContext } from "./context/PrimaryKeyContext";
import { useSelectedContext } from "./context/SelectedContext";

export interface TableRowSelectModel {
  data?: any;
}

const TableRowSelect = (model: TableRowSelectModel) => {
  const selected = useSelectedContext();
  const { primaryKey } = usePrimaryKeyContext();
  const { handleRowCheckbox } = useRowCheckboxContext();
  const { data } = model;
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
