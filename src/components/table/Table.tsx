import React, { createRef, useEffect, useState } from "react";
import TableColumnProps, {
  AttributesCallback,
} from "./contracts/TableColumnProps";
import { getAttributes } from "./helpers/functions";
import { TableRowProps } from "./TableRow";
import SelectedContext from "./context/SelectedContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import TableHeaderProps from "./contracts/TableHeaderProps";
import TableBodyProps from "./contracts/TableBodyProps";
import TableHeaderSelect from "./TableHeaderSelect";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import CheckboxSelectContext from "./context/CheckboxSelectContext";
import BatchCheckboxSelectContext from "./context/BatchCheckboxSelectContext";

export interface TableProps {
  primaryKey?: string;
  header?: TableHeaderProps;
  body?: TableBodyProps;
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
  selected?: Array<any>;
  attributes?: object | AttributesCallback;
}

const Table = (props: TableProps) => {
  const { data, primaryKey } = props;
  const [selected, setSelected] = useState<any>([]);
  const headerSelectRef = createRef<any>();

  useEffect(() => {
    if (selected.length && selected.length !== data!.length) {
      headerSelectRef.current.indeterminate = true;
    }
    if (selected.length && selected.length === data!.length) {
      headerSelectRef.current.indeterminate = false;
      headerSelectRef.current.checked = true;
    }
    if (!selected.length) {
      headerSelectRef.current.indeterminate = false;
      headerSelectRef.current.checked = false;
    }
  }, [data, selected, headerSelectRef]);

  function handleBatchCheckboxChange(e: any, data?: any) {
    if (e.target.checked) {
      setSelected(
        [...selected, ...data].filter(
          (item: any, index: number, array: any) =>
            array.findIndex((e: any) => e === item) === index
        )
      );
    } else {
      setSelected([]);
    }
  }

  function handleCheckboxChange(e: any, id?: any) {
    if (e.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item: any) => item !== id));
    }
  }

  return (
    <PrimaryKeyContext.Provider value={primaryKey}>
      <SelectedContext.Provider value={selected}>
        <BatchCheckboxSelectContext.Provider value={handleBatchCheckboxChange}>
          <CheckboxSelectContext.Provider value={handleCheckboxChange}>
            <table {...getAttributes(props.attributes)}>
              <thead {...getAttributes(props.header?.attributes)}>
                <tr {...getAttributes(props.header?.row?.attributes)}>
                  <TableHeaderSelect ref={headerSelectRef} {...props} />
                  <TableHeader {...props} />
                </tr>
              </thead>
              <tbody {...getAttributes(props.body?.attributes)}>
                <TableRows {...props} />
              </tbody>
            </table>
          </CheckboxSelectContext.Provider>
        </BatchCheckboxSelectContext.Provider>
      </SelectedContext.Provider>
    </PrimaryKeyContext.Provider>
  );
};

Table.defaultProps = {
  primaryKey: "id",
  selected: [],
};

export default Table;
