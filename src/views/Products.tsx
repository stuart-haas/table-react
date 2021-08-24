import React, { useEffect, useState } from "react";
import Table from "components/table/Table";
import { RenderData } from "components/table/contracts/TableColumnProps";
import { TableProps } from "components/table/Table";
import { actions, attributes } from "config/table";
import api from "services/api";
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
        label: "Id",
        property: "id",
      },
      {
        label: "Name",
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
        label: "Description",
        property: "description",
      },
      {
        label: "Price",
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

  async function handleEdit(renderData: RenderData) {
    const { id } = renderData.data;
    const { data } = await api.get(`/${namespace}/${id}`);
    console.log(data);
  }

  async function handleDelete(renderData: RenderData) {
    if(!window.confirm('Are you sure you want to delete this product?')) return;
    const { id } = renderData.data;
    await api.delete(`/${namespace}/${id}`);
    setData(data.filter((item: any) => item.id !== id));
  }

  return <Table {...tableProps} />;
};

export default Products;
