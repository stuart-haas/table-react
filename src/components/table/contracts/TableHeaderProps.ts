import { TableRowProps } from "../TableRow";
import TableColumnProps, { AttributesCallback } from "./TableColumnProps";
import TableHeaderRowProps from "./TableHeaderRowProps";

export default interface TableHeaderProps {
  attributes?: object | AttributesCallback;
  row?: TableHeaderRowProps;
  columns?: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
}