import React, { ChangeEvent, useContext } from "react";
import HeaderCheckboxContext from "./context/HeaderCheckboxContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";

export interface TableHeaderSelectProps {
  data?: any;
}

const TableHeaderSelect = React.forwardRef(
  (props: TableHeaderSelectProps, ref: React.Ref<HTMLInputElement>) => {
    const { primaryKey } = useContext(PrimaryKeyContext);
    const { handleHeaderCheckbox } = useContext(HeaderCheckboxContext);
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
