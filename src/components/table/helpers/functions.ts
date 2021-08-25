import { Order } from '../context/OrderContext';
import TableColumnModel, { AttributesCallback } from '../models/TableColumnModel';
import TableHeaderModel from '../models/TableHeaderModel';
import { TableRowModel } from '../TableRow';
// @ts-ignore
import resolvePath from 'object-resolve-path';

export function render(row: TableRowModel, column: TableColumnModel) {
  const { data, index } = row;
  const { property, render } = column;
  try {
    if (render) {
      if (typeof render === 'function') {
        const value = getValue(data, property);
        return render({ data, value, index, property });
      }
      return render;
    }
    return getValue(data, property);
  } catch (e) {
    console.error(e);
  }
}

export function getValue(data: any, property?: string) {
  if (property && resolvePath(data, property)) {
    return resolvePath(data, property);
  } else {
    if (typeof property !== 'undefined') {
      // eslint-disable-next-line no-throw-literal
      throw `Property ${property} not found in data ${JSON.stringify(data)}`;
    }
  }
}

export function getColumnLabel(column: TableColumnModel & TableHeaderModel, sort: any, order?: Order) {
  const { label, property, rows, columns, data, attributes } = column;
  if (label && typeof label === 'function') {
    return label({ property, rows, columns, data, attributes, sort, order });
  }
  return label;
}

export function getRowAttributes(row: TableRowModel) {
  const { data, index, columns, attributes } = row;
  if (attributes && typeof attributes === 'function') {
    return attributes({ data, columns, index });
  }
  return attributes;
}

export function getColumnAttributes(column: TableColumnModel) {
  const { property, columnAttributes } = column;
  if (columnAttributes && typeof columnAttributes === 'function') {
    return columnAttributes({ property });
  }
  return columnAttributes;
}

export function getDataAttributes(row: TableRowModel, column: TableColumnModel) {
  const { data, index } = row;
  const { dataAttributes } = column;
  if (dataAttributes && typeof dataAttributes === 'function') {
    const value = render(row, column);
    return dataAttributes({ data, value, index });
  }
  return dataAttributes;
}

export function getAttributes(attributes?: object | AttributesCallback) {
  if (attributes && typeof attributes === 'function') {
    return attributes({});
  }
  return attributes;
}