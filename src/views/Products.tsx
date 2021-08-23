import React from "react";
import Table from "components/table/Table";
import { RenderData } from "components/table/contracts/TableColumnProps";
import { TableProps } from "components/table/Table";
import { actions, attributes } from "config/table";

const data = [
  {
    id: 1,
    name: "Pumpkin",
    description: "A large gourd",
    price: 10,
  },
  {
    id: 2,
    name: "Tomato",
    description: "Often mistaken for a vegetable",
    price: 5,
  },
  {
    id: 3,
    name: "Apple",
    description: "Watch out for worms",
    price: 3,
  },
  {
    id: 4,
    name: "Potato",
    description: "Don't forget the starch",
    price: 4,
  },
  {
    id: 5,
    name: "Onion",
    description: "Don't cry",
    price: 2,
  },
  {
    id: 6,
    name: "Watermelon",
    description: "Best when crispy",
    price: 7,
  },
];

const Products = () => {
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
        render: (t: RenderData) => {
          const { value } = t;
          return (
            <button type="button" className="btn btn-link">
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
        render: (t: RenderData) => {
          return `$${t.value}`;
        },
      },
      ...actions({
        edit: handleEdit,
        delete: handleDelete,
      }),
    ],
    data,
  };

  function handleEdit(t: RenderData) {
    console.log(t);
  }

  function handleDelete(t: RenderData) {
    console.log(t);
  }

  return <Table {...tableProps} />;
};

export default Products;
