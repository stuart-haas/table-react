import React, { useContext } from "react";
import HeaderCheckboxContext from "./context/HeaderCheckboxContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";

export interface TableHeaderSelectProps {
  data?: any;
}

const TableHeaderSelect = React.forwardRef(
  (props: TableHeaderSelectProps, ref: React.Ref<HTMLInputElement>) => {
    const primaryKey = useContext(PrimaryKeyContext);
    const select = useContext(HeaderCheckboxContext);
    const { data } = props;
    return (
      <td>
        <input
          type="checkbox"
          ref={ref}
          onChange={(e: any) => {
            const mappedData = data.map((item: any) => item[primaryKey!]);
            select(e, mappedData);
          }}
        />
      </td>
    );
  }
);

export default TableHeaderSelect;
