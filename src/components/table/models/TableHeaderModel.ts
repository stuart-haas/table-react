import { TableRowModel } from "../TableRow";
import TableColumnModel, { AttributesCallback } from "./TableColumnModel";
import TableHeaderRowModel from "./TableHeaderRowModel";

export default interface TableHeaderModel {
  attributes?: object | AttributesCallback;
  row?: TableHeaderRowModel;
  columns?: Array<TableColumnModel>;
  rows?: TableRowModel;
  data?: Array<any>;
}