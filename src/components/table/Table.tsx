import React, { createRef, useEffect, useState } from "react";
import TableColumnProps, {
  AttributesCallback,
} from "./contracts/TableColumnProps";
import { getAttributes } from "./helpers/functions";
import TableRow, { TableRowProps } from "./TableRow";
import SelectedContext from "./context/SelectedContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import TableHeaderProps from "./contracts/TableHeaderProps";
import TableBodyProps from "./contracts/TableBodyProps";
import TableHeader from "./TableHeader";

export interface TableProps {
  primaryKey?: string;
  header?: TableHeaderProps;
  body?: TableBodyProps;
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
  selected?: Array<any>;
  attributes?: object | AttributesCallback;
  checkboxSelection?: boolean;
}

const Table = (props: TableProps) => {
  const [selected, setSelected] = useState<any>([]);
  const [primaryKey, setPrimaryKey] = useState<any>([]);
  const headerCheckbox = createRef<any>();

  useEffect(() => {
    setPrimaryKey(props.primaryKey);
  }, [props.primaryKey]);

  useEffect(() => {
    if (props.checkboxSelection) {
      if (selected.length && selected.length !== props.data!.length) {
        headerCheckbox.current.indeterminate = true;
      }
      if (selected.length && selected.length === props.data!.length) {
        headerCheckbox.current.indeterminate = false;
        headerCheckbox.current.checked = true;
      }
      if (!selected.length) {
        headerCheckbox.current.indeterminate = false;
        headerCheckbox.current.checked = false;
      }
    }
  }, [props.data, selected, headerCheckbox, props.checkboxSelection]);

  function handleBatchSelectChange(e: any, data?: any) {
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
              {props.checkboxSelection && (
                <td>
                  <input
                    type="checkbox"
                    ref={headerCheckbox}
                    onChange={(e: any) => {
                      const mappedData =
                        props.data &&
                        props.data.map((item: any) => item[primaryKey!]);
                      handleBatchSelectChange(e, mappedData);
                    }}
                  />
                </td>
              )}
              <TableHeader {...props} />
            </tr>
          </thead>
          <tbody {...getAttributes(props.body?.attributes)}>
            {props.data?.map((data: TableRowProps, index: number) => (
              <TableRow
                key={index}
                index={index}
                data={data}
                columns={props.columns}
                attributes={props.rows?.attributes}
                checkboxSelection={props.checkboxSelection}
                selectChange={handlSelectChange}
              />
            ))}
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
