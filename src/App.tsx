import React, { useEffect, useState } from 'react';
import './App.css';
import { Table } from 'components/table';
import { TableProps } from 'components/table/Table';
import { ColumnAttributesData } from 'components/table/contracts/TableColumnProps';

function App() {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
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
      {
        name: 'Potato',
        description: 'Go Irish',
        price: 4,
      },
      {
        name: 'Onion',
        description: "Don't cry",
        price: 2,
      },
      {
        name: 'Watermelon',
        description: 'Juicy',
        price: 7,
      },
    ]);
  }, []);

  const tableProps: TableProps = {
    attributes: () => {
      return {
        className: 'table',
      };
    },
    headerRow: {
      attributes: {
        className: 'bg-secondary text-white',
      },
    },
    rows: {
      attributes: (value: ColumnAttributesData) => {
        const { data, index } = value;
        let className = '';
        if(index! % 2 === 1) {
          className = className + ' bg-light';
        }
        if(data.name === 'Onion') {
          className = className + ' bg-danger text-white';
        }
        return {
          className,
        };
      }
    },
    columns: [
      {
        label: 'Id',
        property: 'id',
        value: (value: ColumnAttributesData) => {
          const { index } = value;
          return index! + 1;
        },
      },
      {
        label: 'Name',
        property: 'name',
        dataAttributes: (attributes: ColumnAttributesData) => {
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
        dataAttributes: (attributes: ColumnAttributesData) => {
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
        columnAttributes: {
          style: {
            textAlign: 'right',
          },
        },
        dataAttributes: {
          style: {
            textAlign: 'right',
          },
        },
        transform: (transform: ColumnAttributesData) => {
          return `$${transform.value}`;
        },
      },
    ],
    data
  };

  return (
    <div className="container mt-4">
      <Table {... tableProps} />
    </div>
  );
}

export default App;
