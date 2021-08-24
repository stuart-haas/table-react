import React, { useEffect, useState } from "react";
import Table from "components/table/Table";
import {
  LabelData,
  RenderData,
} from "components/table/contracts/TableColumnProps";
import { TableProps } from "components/table/Table";
import { actions, attributes } from "config/table";
import api from "services/api";
import { TableHeaderCellProps } from "components/table/TableHeaderCell";
import { Order } from "components/table/context/OrderContext";
import OrderIcon from "components/icons/OrderIcon";
interface ProductsProps {
  namespace: string;
}

const Products = (props: ProductsProps) => {
  const { namespace } = props;
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/${namespace}`);
      setData(data);
    };
    fetchData();
  }, [namespace]);

  const tableProps: TableProps = {
    attributes,
    columns: [
      {
        sortable: false,
        label: (labelData: LabelData) => {
          const { sort, order, property } = labelData;
          const props = { label: "Id", sort, order, property };
          return <OrderIcon {...props} />
        },
        property: "id",
      },
      {
        label: (labelData: LabelData) => {
          const { sort, order, property } = labelData;
          const props = { label: "Name", sort, order, property };
          return <OrderIcon {...props} />
        },
        property: "name",
        render: (renderData: RenderData) => {
          const { value } = renderData;
          return (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => handleEdit(renderData)}
            >
              {value}
            </button>
          );
        },
      },
      {
        label: (labelData: LabelData) => {
          const { sort, order, property } = labelData;
          const props = { label: "Description", sort, order, property };
          return <OrderIcon {...props} />
        },
        property: "description",
      },
      {
        label: (labelData: LabelData) => {
          const { sort, order, property } = labelData;
          const props = { label: "Price", sort, order, property };
          return <OrderIcon {...props} />
        },
        property: "price",
        render: (renderData: RenderData) => {
          return `$${renderData.value}`;
        },
      },
      ...actions({
        edit: handleEdit,
        delete: handleDelete,
      }),
    ],
    data,
  };

  async function handleOrder(
    headerCellProps: TableHeaderCellProps,
    order: Order
  ) {
    const { property } = headerCellProps;
    const params = [Order.Asc, Order.Desc].includes(order)
      ? `?_sort=${property}&_order=${order}`
      : Order.None;
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
