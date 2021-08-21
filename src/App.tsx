import React from 'react';
import './App.css';
import { Table } from 'components/table';
import { TableProps } from 'components/table/Table';
import { ColumnAttributesData } from 'components/table/contracts/TableColumnProps';

function App() {
  const tableProps: TableProps = {
    attributes: () => {
      return {
        className: 'table',
      };
    },
    columns: [
      {
        label: 'Id',
        property: 'id',
        value: (value: ColumnAttributesData) => {
          const { index } = value;
          return index + 1;
        },
      },
      {
        label: 'Name',
        property: 'name',
        attributes: (attributes: ColumnAttributesData) => {
          if(attributes.value === 'Tomato') {
            return {
              className: 'fw-bold',
            };
          }
        },
      },
      {
        label: 'Description',
        property: 'description',
        transform: (transform: ColumnAttributesData) => {
          return transform.value;
        },
        attributes: (attributes: ColumnAttributesData) => {
          const { data } = attributes;
          const { name } = data;
          if(name === 'Pumpkin') {
            return {
              className: 'fw-bold',
            };
          }
        }
      },
      {
        label: 'Price',
        property: 'price',
      },
    ],
    data: [
      {
        name: 'Pumpkin',
        description: 'A large gourd',
        price: 10,
      },
      {
        name: 'Tomato',
        description: 'Not mistaken for a vegetable',
        price: 5,
      },
      {
        name: 'Apple',
        description: 'Watch out for worms',
        price: 3,
      },
    ],
  };

  return (
    <div className="App">
      <Table {... tableProps} />
    </div>
  );
}

export default App;
