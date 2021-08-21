import TableColumnProps, { AttributesCallback } from './contracts/TableColumnProps';
import { TableRowProps } from './TableRow';

export function getValueByProperty(row: TableRowProps, column: TableColumnProps) {
    const { data, index } = row;
    const { property, value, transform } = column;
    try {
        if(value) {
            if(typeof value === 'function') {
                return value({ data, value, index });
            }
            return value;
        }
        if(transform) {
            const value = getValue(data, property);
            return transform({ data, value, index});
        }
        return getValue(data, property);
    } catch(e) {
        console.error(e);
    }
}

export function getValue(data: any, property: string = '') {
    if(data[property]) {
        return data[property];
    } else {
        // eslint-disable-next-line no-throw-literal
        throw `Property ${property} not found in data ${JSON.stringify(data)}`;
    }
}

export function getColumnAttributes(row: TableRowProps, column: TableColumnProps) {
    const { data, index } = row;
    const { attributes } = column;
    if(attributes && typeof attributes === 'function') {
        const value = getValueByProperty(row, column);
        return attributes({ data, value, index });
    }
    return attributes;
}

export function getAttributes(attributes?: object|AttributesCallback) {
    if(attributes && typeof attributes === 'function') {
        return attributes({});
    }
    return attributes;
}