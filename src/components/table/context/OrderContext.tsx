import { createContext } from "react";
import { TableHeaderCellProps } from "../TableHeaderCell";

export interface IOrderContext {
  sort: string|null;
  order: Order;
  handleSetOrder: (props: TableHeaderCellProps) => void;
}

export enum Order {
  Asc = "asc",
  Desc = "desc",
  None = "",
}

const OrderContext = createContext<Partial<IOrderContext>>({});

export default OrderContext;
