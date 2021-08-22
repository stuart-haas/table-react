import { AttributesCallback } from "./TableColumnProps";
import TableHeaderRowProps from "./TableHeaderRowProps";

export default interface TableHeaderProps {
  attributes?: object | AttributesCallback;
  row?: TableHeaderRowProps;
}