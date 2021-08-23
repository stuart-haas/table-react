import React, { Fragment } from "react";
import Table from "components/table/Table";
import { RenderData } from "components/table/contracts/TableColumnProps";
import { TableProps } from "components/table/Table";

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
    attributes: () => {
      return {
        className: "table table-borderless table-striped",
      };
    },
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
      {
        label: "Actions",
        render: (t: RenderData) => {
          return (
            <Fragment>
              <i className="bi bi-pencil-square me-2" role="button" onClick={() => window.alert(`Edit ${JSON.stringify(t.data)}`)}></i>
              <i className="bi bi-trash-fill" role="button" onClick={() => window.alert(`Delete ${JSON.stringify(t.data)}`)}></i>
            </Fragment>
          );
        },
      },
    ],
    data,
  };

  return <Table {...tableProps} />;
};

export default Products;
