import { TableRowProps } from "../TableRow";
import TableColumnProps from "./TableColumnProps";

export default interface TableHeaderCellsProps {
  columns: Array<TableColumnProps>;
  rows?: TableRowProps;
  data?: Array<any>;
}