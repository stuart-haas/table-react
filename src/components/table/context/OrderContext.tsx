import { createContext } from "react";

export enum Order {
    Asc = "asc",
    Desc = "desc",
    None = "",
  }

const OrderContext = createContext<any>({
    sort: "",
    order: Order.None,
    setOrder: () => {}
});

export default OrderContext;
