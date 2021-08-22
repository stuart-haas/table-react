import React, { createRef, useEffect, useState } from "react";
import {
  TableBodyProps,
  TableColumnProps,
  TableHeaderProps,
} from "./contracts";
import { TableAttributes } from "./contracts/TableColumnProps";
import { getAttributes } from "./helpers/functions";
import * as Render from "./helpers/render";
import { TableRowProps } from "./TableRow";
import SelectedContext from "./context/SelectedContext";

interface DefaultTableProps {
  header?: TableHeaderProps;
  body?: TableBodyProps;
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
}

export type TableProps = DefaultTableProps & TableAttributes;

const Table = (props: TableProps) => {
  const [selected, setSelected] = useState<any>([]);
  const batchSelectRef = createRef<any>();

  useEffect(() => {
    if (selected.length && selected.length !== props.data!.length) {
      batchSelectRef.current.indeterminate = true;
    }
    if (selected.length && selected.length === props.data!.length) {
      batchSelectRef.current.checked = true;
      batchSelectRef.current.indeterminate = false;
    }
    if (!selected.length) {
      batchSelectRef.current.indeterminate = false;
      batchSelectRef.current.checked = false;
    }
  }, [props.data, selected, batchSelectRef]);

  function handleBatchSelectChange(e: any, data?: any) {
    if (e.target.checked) {
      setSelected(
        [...selected, ...data].filter(
          (item: any, index: number, array: any) =>
            array.findIndex((t: any) => t.id === item.id) === index
        )
      );
    } else {
      setSelected([]);
    }
  }

  function handlSelectChange(e: any, data?: any) {
    if (e.target.checked) {
      setSelected([...selected, { ...data }]);
    } else {
      setSelected(selected.filter((item: any) => item.id !== data.id));
    }
  }

  return (
    <SelectedContext.Provider value={selected}>
      <table {...getAttributes(props.attributes)}>
        <thead {...getAttributes(props.header?.attributes)}>
          <tr {...getAttributes(props.header?.row?.attributes)}>
            {Render.BatchRowSelect({
              data: props.data,
              ref: batchSelectRef,
              batchSelectChange: handleBatchSelectChange,
            })}
            {Render.HeaderCells(props)}
          </tr>
        </thead>
        <tbody {...getAttributes(props.body?.attributes)}>
          {Render.Rows({
              ...props,
              selectChange: handlSelectChange,
          })}
        </tbody>
      </table>
    </SelectedContext.Provider>
  );
};

export default Table;
