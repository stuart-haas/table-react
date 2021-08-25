import DeleteButton from "components/buttons/DeleteButton";
import EditButton from "components/buttons/EditButton";
import OrderIcon from "components/icons/OrderIcon";
import {
  LabelData,
  RenderData,
} from "components/table/models/TableColumnModel";
import React, { Fragment } from "react";

export const attributes = () => {
  return {
    className: "table table-borderless table-striped",
  };
};
export interface TableActions {
  edit?: (data?: any) => void;
  delete?: (data?: any) => void;
}

export const actions = (actions: TableActions) => {
  return [
    {
      label: "Actions",
      attributes: {
        className: "text-end",
      },
      render: (renderData: RenderData) => {
        return (
          <Fragment>
            {actions.edit && (
              <EditButton onClick={() => actions.edit!(renderData)} />
            )}
            {actions.delete && (
              <DeleteButton onClick={() => actions.delete!(renderData)} />
            )}
          </Fragment>
        );
      },
    },
  ];
};

export const sortableLabel = (label: string) => (labelData: LabelData) => {
  const { sort, order, property } = labelData;
  const model = { label, sort, order, property };
  return <OrderIcon {...model} />;
};

export interface EditCellModel {
  handleEdit: (renderData: RenderData) => void;
}

export const editCell = (model: EditCellModel) => (renderData: RenderData) => {
  const { handleEdit } = model;
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

export const priceCell = () => (renderData: RenderData) => {
  const { value } = renderData;
  return `$${parseFloat(String(value)).toFixed(2)}`;
}
