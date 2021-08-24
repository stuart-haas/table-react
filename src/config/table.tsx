import DeleteButton from "components/buttons/DeleteButton";
import EditButton from "components/buttons/EditButton";
import { RenderData } from "components/table/contracts/TableColumnProps";
import React, { Fragment } from "react";

export interface TableActions {
  edit?: (data?: any) => void;
  delete?: (data?: any) => void;
};

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
            {props.edit && <EditButton
              onClick={() => props.edit!(renderData)}
            />}
            {props.delete && <DeleteButton
              onClick={() => props.delete!(renderData)}
            />}
          </Fragment>
        );
      },
    },
  ];
};

export const attributes = () => {
  return {
    className: "table table-borderless table-striped",
  };
};
