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
import OrderContext from "./context/OrderContext";
import { TableHeaderCellProps } from "./TableHeaderCell";

export enum Order {
  Asc = "asc",
  Desc = "desc",
  None = "",
}

export interface TableProps {
  primaryKey?: string;
  header?: TableHeaderProps;
  body?: TableBodyProps;
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
  selected?: Array<any>;
  attributes?: object | AttributesCallback;
  order?: Order,
  onOrderChange?: (headerCellProps: TableHeaderCellProps, order: Order) => void;
}

const Table = (props: TableProps) => {
  const { data, primaryKey } = props;
  const headerSelectRef = createRef<any>();
  const [selected, setSelected] = useState<any>([]);
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    setOrder(props.order);
  }, [props.order]);

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

  function handleOrder(headerCellProps: TableHeaderCellProps) {
    let currentOrder =
      order === Order.None
        ? Order.Asc
        : order === Order.Asc
        ? Order.Desc
        : Order.None;
    setOrder(currentOrder);
    props.onOrderChange && props.onOrderChange(headerCellProps, currentOrder);
  }

  return (
    <PrimaryKeyContext.Provider value={primaryKey}>
      <SelectedContext.Provider value={selected}>
        <BatchCheckboxSelectContext.Provider value={handleBatchCheckboxChange}>
          <CheckboxSelectContext.Provider value={handleCheckboxChange}>
            <OrderContext.Provider value={handleOrder}>
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
            </OrderContext.Provider>
          </CheckboxSelectContext.Provider>
        </BatchCheckboxSelectContext.Provider>
      </SelectedContext.Provider>
    </PrimaryKeyContext.Provider>
  );
};

Table.defaultProps = {
  primaryKey: "id",
  order: Order.None,
  selected: [],
};

export default Table;
