import React from "react";
import PrimaryKeyContext from "./context/PrimaryKeyContext";

export interface TableHeaderSelectProps {
  data?: any;
  batchSelectChange: (e: any, data?: any) => void;
}

const TableHeaderSelect = React.forwardRef((props: TableHeaderSelectProps, ref: React.Ref<HTMLInputElement>) => {
  const { batchSelectChange, data } = props;
  return (
    <td>
      <PrimaryKeyContext.Consumer>
        {(value) => (
          <input
            type="checkbox"
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
});

export default TableHeaderSelect;
