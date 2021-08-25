import React, { useEffect, useState } from "react";
import Table, { OrderChangeEvent } from "components/table/Table";
import {
  RenderData,
} from "components/table/models/TableColumnModel";
import { TableModel } from "components/table/Table";
import { actions, attributes, editCell, sortableLabel } from "config/table";
import api from "services/api";
import { Order } from "components/table/context/OrderContext";
import { useFetch } from "utils/hooks";

interface StoreModel {
  namespace: string;
  sort?: string;
  order?: Order;
}

const Stores = (model: StoreModel) => {
  const { sort, order, namespace } = model;
  const [data, setData] = useState<any>([]);

  const { data: initData } = useFetch(namespace, {
    _sort: sort,
    _order: order,
    _embed: 'products',
  });

  useEffect(() => {
    setData(initData);
  }, [initData]);

  const tableModel: TableModel = {
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
      ...actions({
        edit: handleEdit,
        delete: handleDelete,
      }),
    ],
    data,
  };

  async function handleOrder(event: OrderChangeEvent) {
    const { model, order } = event;
    const { property } = model;
    const params = [Order.Asc, Order.Desc].includes(order)
      ? `?_sort=${property}&_order=${order}&_embed=products`
      : `${Order.Natural}?_embed=products`;
    const { data } = await api.get(`/${namespace}${params}`);
    setData(data);
  }

  async function handleEdit(renderData: RenderData) {
    const { id } = renderData.data;
    const { data } = await api.get(`/${namespace}/${id}`);
    console.log(data);
  }

  async function handleDelete(renderData: RenderData) {
    if (!window.confirm("Are you sure you want to delete this store?"))
      return;
    const { id } = renderData.data;
    await api.delete(`/${namespace}/${id}`);
    setData(data.filter((item: any) => item.id !== id));
  }

  return (
    <Table
      {...tableModel}
      onOrderChange={handleOrder}
    />
  );
};

export default Stores;
