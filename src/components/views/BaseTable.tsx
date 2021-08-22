import React, { Fragment } from "react";
import { Table } from "components/table";
import {
  TableData,
  TableLabelData,
} from "components/table/contracts/TableColumnProps";
import { TableProps } from "components/table/Table";
import SelectedContext from "components/table/context/SelectedContext";
import Checkbox from "components/form/Checkbox";

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
    attributes: () => {
      return {
        className: "table",
      };
    },
    header: {
      row: {
        attributes: {
          className: "bg-secondary text-white",
        },
      },
    },
    rows: {
      attributes: (t: TableData) => {
        const { index } = t;
        let className = "";
        if (index! % 2 === 1) {
          className = className + " bg-light";
        }
        return {
          className,
        };
      },
    },
    columns: [
      {
        label: (t: TableLabelData) => {
          return (
            <SelectedContext.Consumer>
              {(value) => (
                <Checkbox />
              )}
            </SelectedContext.Consumer>
          )
        },
      },
      {
        label: "Id",
        property: "id",
      },
      {
        label: "Name",
        property: "name",
        dataAttributes: (t: TableData) => {
          if (t.value === "Tomato") {
            return {
              className: "fw-bold",
            };
          }
        },
        transform: (t: TableData) => {
          const { value } = t;
          return (
            <button type="button" className="btn btn-link">{value}</button>
          );
        }
      },
      {
        label: "Description",
        property: "description",
        dataAttributes: (t: TableData) => {
          const { data } = t;
          const { name } = data;
          if (name === "Pumpkin") {
            return {
              className: "fw-bold",
            };
          }
        },
      },
      {
        label: (t: TableLabelData) => {
          return "Price";
        },
        property: "price",
        columnAttributes: {
          style: {
            textAlign: "right",
          },
        },
        dataAttributes: {
          style: {
            textAlign: "right",
          },
        },
        transform: (t: TableData) => {
          return `$${t.value}`;
        },
      },
      {
        label: (t: TableLabelData) => {
          return '';
        },
        columnAttributes: {
          style: {
            textAlign: "right",
          },
          className: "fw-bold",
        },
        dataAttributes: {
          style: {
            textAlign: "right",
          },
        },
        value: (t: TableData) => {
          return (
            <Fragment>
              <i className="bi bi-clipboard me-2" role="button"></i>
              <i className="bi bi-trash-fill" role="button"></i>
            </Fragment>
          );
        },
      },
    ],
    data,
  };

  return (
    <Table {...tableProps} />
  );
}

export default BaseTable;
