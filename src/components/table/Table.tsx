import React, { createRef, useEffect, useState } from "react";
import TableColumnProps, {
  TableAttributes,
} from "./contracts/TableColumnProps";
import { getAttributes } from "./helpers/functions";
import * as Render from "./helpers/render";
import { TableRowProps } from "./TableRow";
import SelectedContext from "./context/SelectedContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import TableHeaderProps from "./contracts/TableHeaderProps";
import TableBodyProps from "./contracts/TableBodyProps";
import TableHeaderSelect from "./TableHeaderSelect";

interface DefaultTableProps {
  primaryKey?: string;
  header?: TableHeaderProps;
  body?: TableBodyProps;
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
  selected?: Array<any>;
}

export type TableProps = DefaultTableProps & TableAttributes;

const Table = (props: TableProps) => {
  const [selected, setSelected] = useState<any>([]);
  const [primaryKey, setPrimaryKey] = useState<any>([]);
  const headerSelectRef = createRef<any>();

  useEffect(() => {
    setPrimaryKey(props.primaryKey);
  }, [props.primaryKey]);

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

  return (
    <PrimaryKeyContext.Provider value={primaryKey}>
      <SelectedContext.Provider value={selected}>
        <table {...getAttributes(props.attributes)}>
          <thead {...getAttributes(props.header?.attributes)}>
            <tr {...getAttributes(props.header?.row?.attributes)}>
              <TableHeaderSelect
                data={props.data}
                forwardRef={headerSelectRef}
                batchSelectChange={handleBatchSelectChange}
              />
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
    </PrimaryKeyContext.Provider>
  );
};

Table.defaultProps = {
  primaryKey: "id",
  selected: [],
};

export default Table;
