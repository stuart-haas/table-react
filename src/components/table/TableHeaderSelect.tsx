import React from "react";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import TableCheckbox from "./TableCheckbox";

export interface TableHeaderSelectProps {
  forwardRef: any;
  data?: any;
  batchSelectChange: (e: any, data?: any) => void;
}

const TableHeaderSelect = (props: TableHeaderSelectProps) => {
  const { forwardRef, batchSelectChange, data } = props;
  return (
    <td>
      <PrimaryKeyContext.Consumer>
        {(value) => (
          <TableCheckbox
            ref={forwardRef}
            onChange={(e: any) => {
              const mappedData = data.map((item: any) => item[value!]);
              batchSelectChange(e, mappedData);
            }}
          />
        )}
      </PrimaryKeyContext.Consumer>
    </td>
  );
};

export default TableHeaderSelect;
