import React, { createRef, useEffect, useState } from "react";
import TableColumnModel, {
  AttributesCallback,
} from "./models/TableColumnModel";
import { getAttributes } from "./helpers/functions";
import { TableRowModel } from "./TableRow";
import SelectedContext from "./context/SelectedContext";
import PrimaryKeyContext from "./context/PrimaryKeyContext";
import TableHeaderModel from "./models/TableHeaderModel";
import TableBodyModel from "./models/TableBodyModel";
import TableHeaderSelect from "./TableHeaderSelect";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import RowCheckboxContext, { IRowCheckboxContextModel } from "./context/RowCheckboxContext";
import OrderContext, { Order } from "./context/OrderContext";
import { TableHeaderCellModel } from "./TableHeaderCell";
import HeaderCheckboxContext, { IHeaderCheckboxContextModel } from "./context/HeaderCheckboxContext";

export interface OrderChangeEvent {
  model: TableHeaderCellModel;
  order: Order;
}

export interface SelectChangeEvent {
  data: Array<any>;
}

export interface TableModel {
  primaryKey?: string;
  header?: TableHeaderModel;
  body?: TableBodyModel;
  columns: Array<TableColumnModel>;
  rows?: TableRowModel;
  data?: Array<any>;
  selected?: Array<any>;
  attributes?: object | AttributesCallback;
  sort?: string;
  order?: Order;
  onOrderChange?: (event: OrderChangeEvent) => void;
  onSelectChange?: (event: SelectChangeEvent) => void;
}

const Table = (props: TableModel) => {
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

  function handleSetOrder(model: TableHeaderCellModel) {
    const { property } = model;
    let currentOrder =
      order === Order.Natural
        ? Order.Asc
        : order === Order.Asc
        ? Order.Desc
        : Order.Natural;
    setOrder(currentOrder);
    setSort(property);
    props.onOrderChange && props.onOrderChange({ model, order: currentOrder });
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
