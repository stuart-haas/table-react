import TableColumnProps from './contracts/TableColumnProps';
import { TableRowProps } from './TableRow';

export function getValueByProperty(row: TableRowProps, column: TableColumnProps) {
    const { data: rowData, index } = row;
    const { property, value, transform } = column;
    const data = getDataByIndex(rowData, index);
    try {
        if(value && typeof value === 'function') {
            transform && transform(data, value, index);
            return value(data, index);
        }
        if(value && typeof value !== 'function') {
            transform && transform(data, value, index);
            return value;
        }
        if(transform) {
            const value = getValue(data, property);
            return transform(data, value, index);
        }
        return getValue(data, property);
    } catch(e) {
        console.error(e);
    }
}

function getDataByIndex(data: any, index: number) {
    return data[index];
}

export function getValue(data: any, property: string = '') {
    if(data[property]) {
        return data[property];
    } else {
        // eslint-disable-next-line no-throw-literal
        throw `Property ${property} not found in data ${JSON.stringify(data)}`;
    }
}

export function getStyle(row: TableRowProps, column: TableColumnProps) {
    const { data, index } = row;
    const { style } = column;
    if(style && typeof style === 'function') {
        const value = getValueByProperty(row, column);
        return style(data, value, index);
    }
    return style;
}

export function getClassName(row: TableRowProps, column: TableColumnProps) {
    const { data, index } = row;
    const { className } = column;
    if(className && typeof className === 'function') {
        const value = getValueByProperty(row, column);
        return className(data, value, index);
    }
    return className;
}

export function getAttributes(row: TableRowProps, column: TableColumnProps) {
    const { data, index } = row;
    const { attributes } = column;
    if(attributes && typeof attributes === 'function') {
        const value = getValueByProperty(row, column);
        return attributes(data, value, index);
    }
    return attributes;
}