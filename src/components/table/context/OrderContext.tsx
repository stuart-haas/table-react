import { createContext, useContext } from "react";
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

export const useOrderContext = () => useContext(OrderContext);

export default OrderContext;
