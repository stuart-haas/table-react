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
import ColumnsContext from "./context/ColumnsContext";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

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
  const [columns, setColumns] = useState<any>([]);
  const [selected, setSelected] = useState<any>([]);
  const [primaryKey, setPrimaryKey] = useState<any>([]);
  const headerSelectRef = createRef<any>();

  useEffect(() => {
    setPrimaryKey(props.primaryKey);
  }, [props.primaryKey]);

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  useEffect(() => {
    if (selected.length && selected.length !== props.data!.length) {
      headerSelectRef.current.indeterminate = true;
    }
    if (selected.length && selected.length === props.data!.length) {
      headerSelectRef.current.indeterminate = false;
      headerSelectRef.current.checked = true;
    }
    if (!selected.length) {
      headerSelectRef.current.indeterminate = false;
      headerSelectRef.current.checked = false;
    }
  }, [props.data, selected, headerSelectRef]);

  function handleBatchSelectChange(e: any, data?: any) {
    if (e.target.checked) {
      setSelected(
        [...selected, ...data].filter(
          (item: any, index: number, array: any) =>
            array.findIndex((t: any) => t === item) === index
        )
      );
    } else {
      setSelected([]);
    }
  }

  function handlSelectChange(e: any, id?: any) {
    if (e.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item: any) => item !== id));
    }
  }

  const rowsProps = { ...props, selectChange: handlSelectChange };

  return (
    <PrimaryKeyContext.Provider value={primaryKey}>
      <ColumnsContext.Provider value={columns}>
        <SelectedContext.Provider value={selected}>
          <table {...getAttributes(props.attributes)}>
            <thead {...getAttributes(props.header?.attributes)}>
              <tr {...getAttributes(props.header?.row?.attributes)}>
                <TableHeaderSelect
                  data={props.data}
                  forwardRef={headerSelectRef}
                  batchSelectChange={handleBatchSelectChange}
                />
                <TableHeader {...props} />
              </tr>
            </thead>
            <tbody {...getAttributes(props.body?.attributes)}>
              <TableRows {...rowsProps} />
            </tbody>
          </table>
        </SelectedContext.Provider>
      </ColumnsContext.Provider>
    </PrimaryKeyContext.Provider>
  );
};

Table.defaultProps = {
  primaryKey: "id",
  selected: [],
};

export default Table;
