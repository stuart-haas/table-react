import React from "react";
import { Order } from "components/table/context/OrderContext";

export interface OrderIconProps {
  sort?: any;
  order?: Order;
  label: string;
  property?: any;
}

const OrderIcon = (props: OrderIconProps) => {
  const { property, sort, order, label } = props;
  const className =
    order === Order.Asc
      ? "bi bi-sort-up"
      : order === Order.Desc
      ? "bi bi-sort-down"
      : Order.Natural;
  return (
    <span className="user-select-none" role="button">
      <span className="me-2">{label}</span>
      {sort === property && <i className={className} />}
    </span>
  );
};

export default OrderIcon;
