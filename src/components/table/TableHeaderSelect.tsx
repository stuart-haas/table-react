import React, { ChangeEvent } from "react";
import { useHeaderCheckboxContext } from "./context/HeaderCheckboxContext";
import { usePrimaryKeyContext } from "./context/PrimaryKeyContext";

export interface TableHeaderSelectProps {
  data?: any;
}

const TableHeaderSelect = React.forwardRef(
  (props: TableHeaderSelectProps, ref: React.Ref<HTMLInputElement>) => {
    const { primaryKey } = usePrimaryKeyContext();
    const { handleHeaderCheckbox } = useHeaderCheckboxContext();
    const { data } = props;
    return (
      <td>
        <input
          type="checkbox"
          ref={ref}
          onChange={(event: ChangeEvent<HTMLInputElement>|undefined) => {
            const keys = data.map((item: any) => item[primaryKey!]);
            handleHeaderCheckbox && handleHeaderCheckbox({ event, keys });
          }}
        />
      </td>
    );
  }
);

export default TableHeaderSelect;
