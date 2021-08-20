import React from 'react';
import './App.css';
import { Table } from 'components/table';
import { TableProps } from 'components/table/Table';

function App() {
  const tableProps: TableProps = {
    className: 'table',
    header: {
      
    },
    columns: [
      {
        label: 'Id',
        property: 'id',
        value: (data: any, index: number) => {
          return index + 1;
        },
      },
      {
        label: 'Name',
        property: 'name',
        attributes: (data: any, value: any, index: number) => {
          if(value === 'Apple') {
            return {
              'data-name': value.toLowerCase(),
            };
          }
        },
        className: (data: any, value: any, index: number) => {
          if(value === 'Tomato') {
            return 'fw-bold';
          }
        }
      },
      {
        label: 'Description',
        property: 'description',
        transform: (data: any, value: any, index: number) => {
          return value;
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
