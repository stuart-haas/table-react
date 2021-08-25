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
import RowCheckboxContext, { IRowCheckboxContextModel } from "./context/RowCheckboxContext";
import OrderContext, { Order } from "./context/OrderContext";
import { TableHeaderCellProps } from "./TableHeaderCell";
import HeaderCheckboxContext, { IHeaderCheckboxContextModel } from "./context/HeaderCheckboxContext";

export interface TableProps {
  primaryKey?: string;
  header?: TableHeaderProps;
  body?: TableBodyProps;
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
  selected?: Array<any>;
  attributes?: object | AttributesCallback;
  sort?: string;
  order?: Order;
  onOrderChange?: (headerCellProps: TableHeaderCellProps, order: Order) => void;
  onSelectChange?: (data: Array<any>) => void;
}

const Table = (props: TableProps) => {
  const { data, primaryKey } = props;
  const headerSelectRef = createRef<any>();
  const [selected, setSelected] = useState<any>([]);
  const [order, setOrder] = useState<Order>();
  const [sort, setSort] = useState<any>();

  useEffect(() => {
    setSort(props.sort);
  }, [props.sort]);

  useEffect(() => {
    setOrder(props.order);
  }, [props.order]);

  useEffect(() => {
    props.onSelectChange && props.onSelectChange(selected);
  }, [props, selected]);

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

  function handleRowCheckbox(model: IRowCheckboxContextModel) {
    const { event, key } = model;
    if (event?.target.checked) {
      setSelected([...selected, key]);
    } else {
      setSelected(selected.filter((item: any) => item !== key));
    }
  }

  function handleHeaderCheckbox(model: IHeaderCheckboxContextModel) {
    const { event, keys } = model;
    if (event?.target.checked) {
      setSelected(
        [...selected, ...keys!].filter(
          (item: any, index: number, array: any) =>
            array.findIndex((e: any) => e === item) === index
        )
      );
    } else {
      setSelected([]);
    }
  }

  function handleSetOrder(headerCellProps: TableHeaderCellProps) {
    const { property } = headerCellProps;
    let currentOrder =
      order === Order.Natural
        ? Order.Asc
        : order === Order.Asc
        ? Order.Desc
        : Order.Natural;
    setOrder(currentOrder);
    setSort(property);
    props.onOrderChange && props.onOrderChange(headerCellProps, currentOrder);
  }

  return (
    <PrimaryKeyContext.Provider value={{primaryKey}}>
      <SelectedContext.Provider value={selected}>
        <HeaderCheckboxContext.Provider value={{ handleHeaderCheckbox }}>
          <RowCheckboxContext.Provider value={{handleRowCheckbox}}>
            <OrderContext.Provider value={{sort, order, handleSetOrder}}>
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
          </RowCheckboxContext.Provider>
        </HeaderCheckboxContext.Provider>
      </SelectedContext.Provider>
    </PrimaryKeyContext.Provider>
  );
};

Table.defaultProps = {
  primaryKey: "id",
  order: Order.Natural,
  selected: [],
};

export default Table;
