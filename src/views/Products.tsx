import React, { useEffect, useState } from "react";
import Table, { OrderChangeModel } from "components/table/Table";
import {
  RenderData,
} from "components/table/contracts/TableColumnProps";
import { TableProps } from "components/table/Table";
import { actions, attributes, editCell, priceCell, sortableLabel } from "config/table";
import api from "services/api";
import { TableHeaderCellProps } from "components/table/TableHeaderCell";
import { Order } from "components/table/context/OrderContext";
import { useFetch } from "utils/hooks";
interface ProductsProps {
  namespace: string;
  sort?: string;
  order?: Order;
}

const Products = (props: ProductsProps) => {
  const { sort, order, namespace } = props;
  const [data, setData] = useState<any>([]);

  const { data: initData } = useFetch(namespace, {
    _sort: sort,
    _order: order,
  });

  useEffect(() => {
    setData(initData);
  }, [initData]);

  const tableProps: TableProps = {
    attributes,
    sort,
    order,
    columns: [
      {
        sortable: false,
        label: "Id",
        property: "id",
      },
      {
        label: sortableLabel("Name"),
        property: "name",
        render: editCell({ handleEdit }),
      },
      {
        label: sortableLabel("Description"),
        property: "description",
      },
      {
        label: sortableLabel("Inventory"),
        property: "inventory",
      },
      {
        label: sortableLabel("Price"),
        property: "price",
        render: priceCell(),
        attributes: {
          className: "text-end",
        },
      },
      ...actions({
        edit: handleEdit,
        delete: handleDelete,
      }),
    ],
    data,
  };

  async function handleOrder(model: OrderChangeModel) {
    const { props, order } = model;
    const { property } = props;
    const params = [Order.Asc, Order.Desc].includes(order)
      ? `?_sort=${property}&_order=${order}`
      : Order.Natural;
    const { data } = await api.get(`/${namespace}${params}`);
    setData(data);
  }

  async function handleEdit(renderData: RenderData) {
    const { id } = renderData.data;
    const { data } = await api.get(`/${namespace}/${id}`);
    console.log(data);
  }

  async function handleDelete(renderData: RenderData) {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    const { id } = renderData.data;
    await api.delete(`/${namespace}/${id}`);
    setData(data.filter((item: any) => item.id !== id));
  }

  return (
    <Table
      {...tableProps}
      onOrderChange={handleOrder}
    />
  );
};

export default Products;
