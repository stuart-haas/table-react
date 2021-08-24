import React, { useContext } from "react";
import BatchCheckboxSelectContext from "./context/BatchCheckboxSelectContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";

export interface TableHeaderSelectProps {
  data?: any;
}

const TableHeaderSelect = React.forwardRef(
  (props: TableHeaderSelectProps, ref: React.Ref<HTMLInputElement>) => {
    const primaryKey = useContext(PrimaryKeyContext);
    const batchCheckboxSelect = useContext(BatchCheckboxSelectContext);
    const {  data } = props;
    return (
      <td>
        <input
          type="checkbox"
          ref={ref}
          onChange={(e: any) => {
            const mappedData = data.map((item: any) => item[primaryKey!]);
            batchCheckboxSelect(e, mappedData);
          }}
        />
      </td>
    );
  }
);

export default TableHeaderSelect;
