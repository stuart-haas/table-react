import TableColumnProps, { AttributesCallback } from '../contracts/TableColumnProps';
import TableHeaderProps from '../contracts/TableHeaderProps';
import { TableRowProps } from '../TableRow';

export function render(row: TableRowProps, column: TableColumnProps) {
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
  if (property && data[property]) {
    return data[property];
  } else {
    if (typeof property !== 'undefined') {
      // eslint-disable-next-line no-throw-literal
      throw `Property ${property} not found in data ${JSON.stringify(data)}`;
    }
  }
}

export function getHeaderCellLabel(column: TableColumnProps & TableHeaderProps) {
  const { label, property, rows, columns, data, attributes } = column;
  if (label && typeof label === 'function') {
    return label({ property, rows, columns, data, attributes });
  }
  return label;
}

export function getRowAttributes(row: TableRowProps) {
  const { data, index, columns, attributes } = row;
  if (attributes && typeof attributes === 'function') {
    return attributes({ data, columns, index });
  }
  return attributes;
}

export function getHeaderCellAttributes(column: TableColumnProps) {
  const { columnAttributes } = column;
  if (columnAttributes && typeof columnAttributes === 'function') {
    return columnAttributes({});
  }
  return columnAttributes;
}

export function getDataCellAttributes(row: TableRowProps, column: TableColumnProps) {
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