import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { Table } from "components/table";
import { TableProps } from "components/table/Table";
import {
  TableData,
  TableLabelData,
} from "components/table/contracts/TableColumnProps";

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      {
        name: "Pumpkin",
        description: "A large gourd",
        price: 10,
      },
      {
        name: "Tomato",
        description: "Not mistaken for a vegetable",
        price: 5,
      },
      {
        name: "Apple",
        description: "Watch out for worms",
        price: 3,
      },
      {
        name: "Potato",
        description: "Go Irish",
        price: 4,
      },
      {
        name: "Onion",
        description: "Don't cry",
        price: 2,
      },
      {
        name: "Watermelon",
        description: "Juicy",
        price: 7,
      },
    ]);
  }, []);

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
        const { data, index } = t;
        let className = "";
        if (index! % 2 === 1) {
          className = className + " bg-light";
        }
        if (data.name === "Onion") {
          className = className + " bg-danger text-white";
        }
        return {
          className,
          onClick: () => {
            console.log(index, data);
          },
        };
      },
    },
    columns: [
      {
        type: "checkbox",
        label: "Select",
      },
      {
        label: "Id",
        property: "id",
        value: (t: TableData) => {
          const { index } = t;
          return index! + 1;
        },
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
        label: "Actions",
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
    <div className="container mt-4">
      <Table {...tableProps} />
    </div>
  );
}

export default App;
