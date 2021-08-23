import React, { Fragment } from "react";
import Table from "components/table/Table";
import {
  TableData,
} from "components/table/contracts/TableColumnProps";
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
    description: "Not mistaken for a vegetable",
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
    description: "Go Irish",
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
    description: "Juicy",
    price: 7,
  },
];

const BaseTable = () => {
  const tableProps: TableProps = {
    primaryKey: 'name',
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
        transform: (t: TableData) => {
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
        transform: (t: TableData) => {
          return `$${t.value}`;
        },
      },
      {
        label: 'Actions',
        value: (t: TableData) => {
          return (
            <Fragment>
              <i className="bi bi-pencil-square me-2" role="button"></i>
              <i className="bi bi-trash-fill" role="button"></i>
            </Fragment>
          );
        },
      },
    ],
    data,
  };

  return <Table {...tableProps} />;
};

export default BaseTable;
