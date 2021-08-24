import DeleteButton from "components/buttons/DeleteButton";
import EditButton from "components/buttons/EditButton";
import OrderIcon from "components/icons/OrderIcon";
import {
  LabelData,
  RenderData,
} from "components/table/contracts/TableColumnProps";
import React, { Fragment } from "react";

export interface TableActions {
  edit?: (data?: any) => void;
  delete?: (data?: any) => void;
}

export const actions = (props: TableActions) => {
  return [
    {
      label: "Actions",
      attributes: {
        className: "text-end",
      },
      render: (renderData: RenderData) => {
        return (
          <Fragment>
            {props.edit && (
              <EditButton onClick={() => props.edit!(renderData)} />
            )}
            {props.delete && (
              <DeleteButton onClick={() => props.delete!(renderData)} />
            )}
          </Fragment>
        );
      },
    },
  ];
};

export const sortableLabel = (label: string) => (labelData: LabelData) => {
  const { sort, order, property } = labelData;
  const props = { label, sort, order, property };
  return <OrderIcon {...props} />;
};

export interface EditColumnProps {
  handleEdit: (renderData: RenderData) => void;
}

export const editColumn = (props: EditColumnProps) => (renderData: RenderData) => {
  const { handleEdit } = props;
  const { value } = renderData;
  return (
    <button
      type="button"
      className="btn btn-link"
      onClick={() => handleEdit(renderData)}
    >
      {value}
    </button>
  );
};

export const priceColumn = () => (renderData: RenderData) => {
  const { value } = renderData;
  return `$${value}`;
}

export const attributes = () => {
  return {
    className: "table table-borderless table-striped",
  };
};
